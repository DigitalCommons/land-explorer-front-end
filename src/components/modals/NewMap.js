import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { autoSave, newMap } from '../../actions/MapActions';

const NewMap = () => {
    const dispatch = useDispatch();
    const isNewMap = useSelector((state) => state.mapMeta.currentMapId === null);
    const { saving, saveError } = useSelector((state) => state.mapMeta);
    const mapSaved = !isNewMap && !saving && !saveError;

    return <Modal id="newMap" canToggle={true} padding={true}>
        <div className="modal-title">New Map</div>
        <div className="modal-content modal-padding">
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
                    dispatch({ type: 'CLOSE_MODAL', payload: 'newMap' });
                    await dispatch(autoSave());
                    dispatch(newMap());
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
