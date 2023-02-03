import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from "../common/Modal";
import axios from 'axios';
import constants from '../../constants';
import { getAuthHeader } from "../../utils/Auth";
import { saveCurrentMap } from '../../actions/MapActions';

const SaveSnapshot = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const saveMap = () => {
        dispatch(saveCurrentMap(false, true, name))
            .then(() => {
                axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
                    .then((response) => {
                        dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
                        dispatch({
                            type: 'CLOSE_MODAL',
                            payload: 'saveSnapshot'
                        });
                        dispatch({ type: 'SAVE_AS_OFF' });

                        const newMap = response.data[response.data.length - 1];
                        const newMapId = newMap.map.eid;
                        const mapData = JSON.parse(newMap.map.data);
                        dispatch({
                            type: 'LOAD_MAP',
                            payload: mapData,
                            id: newMapId
                        });
                        if (mapData.isSnapshot) {
                            dispatch({ type: 'READ_ONLY_ON' });
                        }
                        setTimeout(() => {
                            dispatch({
                                type: 'CHANGE_MOVING_METHOD',
                                payload: 'flyTo',
                            });
                            dispatch({ type: 'LOADED_DRAWINGS' });
                        }, 1000);
                    })
            })

        setName('');
    }

    return <Modal id="saveSnapshot" padding={true}>
        <div className="modal-title">Save as snapshot</div>
        <div className="modal-content">
            <div>
                <div className="modal-content">
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Name"
                        style={{ marginBottom: '22px' }}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="modal-buttons">
                    <div className="button button-cancel rounded-button-full modal-button-cancel"
                        onClick={() => {
                            dispatch({
                                type: 'CLOSE_MODAL',
                                payload: 'saveSnapshot'
                            });
                            setName('');
                        }}
                    >
                        Cancel
                    </div>
                    <div className="button rounded-button-full modal-button-confirm"
                        onClick={saveMap}
                    >
                        Save
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}

export default SaveSnapshot;
