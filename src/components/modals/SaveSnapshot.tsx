import { useState } from 'react';
import { useAppDispatch } from '@/hooks/react-redux';
import Modal from "./Modal";
import { saveCurrentMap, loadNewestMap } from '../../actions/MapActions';

const SaveSnapshot = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');

    const saveMap = async () => {
        await dispatch(saveCurrentMap(false, true, name) as any);
        dispatch({
            type: 'CLOSE_MODAL',
            payload: 'saveSnapshot'
        });
        setName('');
        dispatch(loadNewestMap() as any);
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
                    <div className={`button ${name.trim() === '' ? 'button-disabled' : ''} rounded-button-full modal-button-confirm`}
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
