import React, { Component, useState } from 'react';
import Modal from '../common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import constants from '../../constants';
import { getAuthHeader } from "../../utils/Auth";
const moment = require('moment/moment.js');

export const MySharedMaps = ({ stage, setStage, drawControl, redrawPolygons, closeModal }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState({ id: null, name: null });

    const maps = useSelector(state => state.myMaps.maps);
    const error = useSelector(state => state.myMaps.error);
    const currentMapId = useSelector(state => state.mapMeta.currentMapId);

    const mapList = maps.map((item, i) => {
        console.log("render map list", item);
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
            </tr>
        )
    });

    return stage === "load" ?
        <>
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
                        const mapResult = maps.filter((item) => item.map.eid === active.id);
                        const savedMap = JSON.parse(mapResult[0].map.data);
                        savedMap.isSnapshot = mapResult[0].isSnapshot;

                        console.log("saved map", savedMap);
                        if (savedMap) {
                            drawControl.draw.deleteAll();
                            axios.post(`${constants.ROOT_URL}/api/user/map/view/`, {
                                "eid": active.id,
                            }, getAuthHeader());

                            //pick up the old name for the landDataLayers
                            if (savedMap.mapLayers.activeLayers) {
                                console.log("happening")
                                savedMap.mapLayers.landDataLayers = savedMap.mapLayers.activeLayers;
                            }
                            //fix that some have no dataLayers
                            if (!savedMap.mapLayers.myDataLayers) {
                                savedMap.mapLayers.myDataLayers = [];
                            }

                            console.log(savedMap.mapLayers.activeLayers)
                            console.log(savedMap)
                            dispatch({
                                type: 'LOAD_MAP',
                                payload: savedMap,
                                id: active.id
                            });
                            closeModal();
                            setStage("list");
                            dispatch({
                                type: 'READ_ONLY_ON'
                            });
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
            </div>
        </> :
        maps.length ?
            <>
                <div className="modal-content">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '230px' }}>Name</th>
                                <th>Modified</th>
                                <th>Type</th>
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
                        onClick={closeModal}
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
            </> :
            <>
                <div className="modal-content modal-content-trash">
                    {
                        error ?
                            <p>Map loading encountered the following error: {error}.</p>
                            :
                            <p>There are no shared maps.</p>
                    }
                </div>
            </>
}

const MySharedMapsModal = ({ drawControl, redrawPolygons }) => {
    const dispatch = useDispatch();
    const [stage, setStage] = useState("list");
    const closeModal = () => dispatch({
        type: 'CLOSE_MODAL',
        payload: 'mySharedMaps'
    });

    return <Modal id="mySharedMaps" padding={true} drawControl={drawControl} customClose={() => setStage("list")}>
        <div className="modal-title">Shared Maps</div>
        <MySharedMaps stage={stage} setStage={setStage} drawControl={drawControl} redrawPolygons={redrawPolygons} closeModal={closeModal} />
    </Modal>
}

export default MySharedMapsModal;
