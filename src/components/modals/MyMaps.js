import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import constants from '../../constants';
import { isMobile } from 'react-device-detect';
import analytics from "../../analytics";
import { getAuthHeader } from "../../utils/Auth";
const moment = require('moment/moment.js');

export const MyMaps = ({ stage, setStage, drawControl, redrawPolygons, closeModal }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState({ id: null, name: null })

    const currentMapId = useSelector(state => state.mapMeta.currentMapId);
    const allMaps = useSelector(state => state.myMaps.maps);
    const error = useSelector(state => state.myMaps.error);

    const close = () => {
        closeModal();
        setStage("list");
        setActive({ id: null, name: null });
    }

    const deleteMap = () => {
        axios.post(`${constants.ROOT_URL}/api/user/map/delete/`, {
            "eid": active.id
        }, getAuthHeader())
            .then((response) => {
                if (active.id === currentMapId) {
                    dispatch({ type: 'NEW_MAP' });
                    drawControl.draw.deleteAll();
                    setTimeout(() => {
                        dispatch({ type: 'CHANGE_MOVING_METHOD', payload: 'flyTo' })
                    });
                }
                axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
                    .then((response) => {
                        dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
                        setStage("list");
                    })
                    .catch(() => {
                        setStage("list");
                    })
            });
    }

    const myMaps = allMaps.filter((map) => map.access === 'WRITE');

    const mapList = myMaps.map((item, i) => {
        const map = item.map;
        const momentDate = moment(map.lastModified).format("DD/MM/YYYY");
        return (
            <tr key={`map-${i}`}
                className={`table-map ${active.id === map.eid ? 'active' : ''}`}
                onClick={() => {
                    setActive({ id: map.eid, name: map.name });
                }}
            >
                <td style={{ width: '230px' }}>{map.name}</td>
                <td>{momentDate}</td>
                <td className={item.isSnapshot ? "snapshot-icon" : "map-icon"} style={{ width: '30px' }}
                    title={item.isSnapshot ? "snapshot" : "map"}
                />
                <td className="table-icon table-share" style={{ width: '24px' }}
                    onClick={() => {
                        analytics.pageview('/app/my-maps/share');
                        dispatch({
                            type: 'SET_MAP_TO_SHARE',
                            payload: item
                        })
                        close();
                        dispatch({ type: 'OPEN_MODAL', payload: "share" })
                    }}
                />
                <td className="table-icon table-trash"
                    onClick={() => setStage("trash")}
                />
            </tr>
        )
    });

    const trash = <>
        <div className="modal-content modal-content-trash">
            {`Delete "${active.name}"? This cannot be undone.`}
        </div>
        <div className="modal-buttons">
            <div className="button button-cancel button-small"
                onClick={() => {
                    setStage("list");
                }}
            >
                Cancel
            </div>
            <div className="button button-small"
                onClick={deleteMap}
            >
                Delete
            </div>
        </div></>

    const load = <>
        <div className="modal-content modal-content-trash"
            style={{ textAlign: 'center' }}>
            {`Load "${active.name}"?`}
            <br />
            <br />
            Any unsaved changes to the current map will be lost.
        </div>
        <div className="modal-buttons">
            <div className="button button-cancel button-small"
                onClick={() => {
                    setStage("list");
                }}
            >
                Cancel
            </div>
            <div className="button button-small"
                onClick={() => {
                    const mapResult = myMaps.filter((item) => item.map.eid === active.id);
                    const savedMap = JSON.parse(mapResult[0].map.data);
                    savedMap.isSnapshot = mapResult[0].isSnapshot;

                    console.log("Open saved map", savedMap);
                    if (savedMap) {
                        drawControl.draw.deleteAll();
                        axios.post(`${constants.ROOT_URL}/api/user/map/view/`, {
                            "eid": active.id,
                        }, getAuthHeader())
                        //pick up the old name for the landDataLayers
                        if (savedMap.mapLayers.activeLayers) {
                            savedMap.mapLayers.landDataLayers = savedMap.mapLayers.activeLayers;
                        }
                        //fix that some have no dataLayers
                        if (!savedMap.mapLayers.myDataLayers) {
                            savedMap.mapLayers.myDataLayers = [];
                        }

                        dispatch({
                            type: 'LOAD_MAP',
                            payload: savedMap,
                            id: active.id
                        });

                        close()

                        if (!isMobile && !savedMap.isSnapshot) {
                            dispatch({ type: 'READ_ONLY_OFF' });
                        }

                        if (savedMap.isSnapshot) {
                            dispatch({
                                type: 'READ_ONLY_ON'
                            });
                        }

                        setTimeout(() => {
                            redrawPolygons();
                        }, 200);
                        setTimeout(() => {
                            dispatch({
                                type: 'CHANGE_MOVING_METHOD',
                                payload: 'flyTo'
                            })
                        }, 1000)
                    }
                }}
            >
                Ok
            </div>
        </div></>

    const noMaps = <>
        <div className="modal-content modal-content-trash">
            {
                error ?
                    <p>Map loading encountered the following error: {error}.</p>
                    :
                    <p>There are no maps.</p>
            }
        </div></>

    return stage === "trash" ? trash
        : stage === "load" ? load
            : mapList ?
                <>
                    <div className="modal-content">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '230px' }}>Name</th>
                                    <th>Modified</th>
                                    <th>Type</th>
                                    <th className="table-icon" style={{ width: '24px' }}></th>
                                    <th className="table-icon"></th>
                                </tr>
                            </thead>
                        </table>
                        <div style={{
                            height: '130px',
                            overflowY: 'scroll',
                        }}>
                            <table>
                                <tbody>
                                    {mapList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <div className="button button-cancel button-small"
                            onClick={close}
                        >
                            Cancel
                        </div>
                        <div className="button button-small"
                            onClick={() => {
                                if (active !== null) {
                                    setStage("load");
                                }
                            }}
                        >
                            Open
                        </div>
                    </div>
                </>
                : noMaps
}

const MyMapsModal = ({ drawControl, redrawPolygons }) => {
    const [stage, setStage] = useState("list");
    const dispatch = useDispatch();
    const closeModal = () => dispatch({
        type: 'CLOSE_MODAL',
        payload: 'myMaps'
    });

    return <Modal id="myMaps" padding={true} customClose={() => setStage("list")} drawControl={drawControl}>
        <div className="modal-title">My Maps</div>
        <MyMaps stage={stage} setStage={setStage} drawControl={drawControl} redrawPolygons={redrawPolygons} closeModal={closeModal} />
    </Modal>
}

export default MyMapsModal;
