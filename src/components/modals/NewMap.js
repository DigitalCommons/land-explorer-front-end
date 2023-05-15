import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { autoSave } from '../../actions/MapActions';

const NewMap = () => {
    const dispatch = useDispatch();
    const mapSaved = useSelector((state) => state.mapMeta.currentMapId !== null);

    return <Modal id="newMap" canToggle={true} padding={true}>
        <div className="modal-title">New Map</div>
        <div className="modal-content">
            <div>
                {mapSaved ?
                    'Are you sure you wish to open a new map?' : 'Any unsaved changes to the current map will be lost.'
                }
            </div>
        </div>
        <div className="modal-buttons">
            <div className="button button-cancel rounded-button-full  modal-button-cancel"
                onClick={() => {
                    dispatch({ type: 'CLOSE_MODAL', payload: 'newMap' });
                }}
            >
                Cancel
            </div>
            <div className="button rounded-button-full  modal-button-confirm"
                onClick={async () => {
                    await dispatch(autoSave());
                    dispatch({ type: 'NEW_MAP' });
                    dispatch({ type: 'CLOSE_MODAL', payload: 'newMap' });
                    setTimeout(() => {
                        dispatch({ type: 'CHANGE_MOVING_METHOD', payload: 'flyTo' });
                    }, 1000);
                }}
            >
                {mapSaved ?
                    'Yes' : 'Ok'
                }
            </div>
        </div>
    </Modal>;
}

export default NewMap;
