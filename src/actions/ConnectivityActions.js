import { autoSave } from './MapActions';
import { updateReadOnly } from './ReadOnlyActions';

export const setOnline = () => {
    return dispatch => {
        dispatch({ type: 'ONLINE' });
        dispatch(updateReadOnly());
        // Save any unsaved changes
        dispatch(autoSave());
    }
}

export const setOffline = () => {
    return dispatch => {
        dispatch({ type: 'OFFLINE' });
        dispatch(updateReadOnly());
    }
}
