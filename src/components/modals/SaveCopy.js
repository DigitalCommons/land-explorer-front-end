import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../common/Modal";
import { loadNewestMap, saveCurrentMap } from '../../actions/MapActions';

const SaveCopy = () => {
    const dispatch = useDispatch();
    const map = useSelector(state => state.map);

    if (!map.name)
        return <Modal id="saveCopy">
            <div className="modal-title">Save a copy</div>
            <div className="modal-content">
                <div>Please add a title to save the map first</div>
            </div>
        </Modal>

    const saveMap = async () => {
        await dispatch(saveCurrentMap(true));
        dispatch({
            type: 'CLOSE_MODAL',
            payload: 'saveCopy'
        });
        dispatch(loadNewestMap());
    }

    return <Modal id="saveCopy" padding={true}>
        <div className="modal-title modal-padding">Save copy of "{map.name}"</div>
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
