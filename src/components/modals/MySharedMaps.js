import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openMap } from '../../actions/MapActions';
import moment from 'moment';

// TODO: share some common code with MyMaps?
export const MySharedMaps = ({ stage, setStage, closeModal }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState({ id: null, name: null });

    const allMaps = useSelector(state => state.myMaps.maps);
    const sharedMaps = allMaps.filter((map) => map.access === 'READ');
    const error = useSelector(state => state.myMaps.error);

    const mapList = sharedMaps.map((item, i) => {
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
                <td className={map.isSnapshot ? "snapshot-icon" : "map-icon"} style={{ width: '30px' }}
                    title={map.isSnapshot ? "snapshot" : "map"}
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
                        console.log("Open shared map", active.id);
                        dispatch(openMap(active.id));
                        closeModal();
                        setStage("list");
                    }}
                >
                    Ok
                </div>
            </div>
        </> :
        mapList.length ?
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
                            <p>There was an error loading shared maps.</p>
                            :
                            <p>There are no shared maps.</p>
                    }
                </div>
            </>
}

const MySharedMapsModal = () => {
    const dispatch = useDispatch();
    const [stage, setStage] = useState("list");
    const closeModal = () => dispatch({
        type: 'CLOSE_MODAL',
        payload: 'mySharedMaps'
    });

    return <Modal id="mySharedMaps" padding={true} customClose={() => setStage("list")}>
        <div className="modal-title">Shared Maps</div>
        <MySharedMaps stage={stage} setStage={setStage} closeModal={closeModal} />
    </Modal>
}

export default MySharedMapsModal;
