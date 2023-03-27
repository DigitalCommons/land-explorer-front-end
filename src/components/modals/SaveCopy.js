import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../common/Modal";
import axios from 'axios';
import constants from '../../constants';
import { getAuthHeader } from "../../utils/Auth";
import { saveCurrentMap } from '../../actions/MapActions';

const SaveCopy = () => {
    const dispatch = useDispatch();
    const map = useSelector(state => state.map);
    const { isSnapshot } = useSelector(state => state.mapMeta);

    if (!map.name)
        return <Modal id="saveCopy">
            <div className="modal-title">Save a copy</div>
            <div className="modal-content">
                <div>Please add a title to save the map first</div>
            </div>
        </Modal>

    const saveMap = () => {
        dispatch(saveCurrentMap(true))
            .then(() => {
                axios.get(`${constants.ROOT_URL}/api/user/maps`, getAuthHeader())
                    .then((response) => {
                        dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
                        dispatch({
                            type: 'CLOSE_MODAL',
                            payload: 'saveCopy'
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
                        if (isSnapshot) {
                            dispatch({
                                type: 'READ_ONLY_ON'
                            });;
                        }
                        setTimeout(() => {
                            dispatch({
                                type: 'CHANGE_MOVING_METHOD',
                                payload: 'flyTo',
                            })
                            dispatch({ type: 'LOADED_DRAWINGS' })
                        }, 1000);
                    })
            })
    }

    return <Modal id="saveCopy" padding={true}>
        <div className="modal-title">Save copy of "{map.name}"</div>
        <div className="modal-buttons">
            <div className="button button-cancel rounded-button-full modal-button-cancel"
                onClick={() => {
                    dispatch({
                        type: 'CLOSE_MODAL',
                        payload: 'saveCopy'
                    });
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
    </Modal>
}

export default SaveCopy;
