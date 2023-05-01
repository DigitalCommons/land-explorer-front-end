import { isMobile } from 'react-device-detect';
import { autoSave } from './MapActions';

export const setOnline = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'ONLINE' });

        const { isSnapshot, writeAccess } = getState().mapMeta;
        if (!isSnapshot && writeAccess && !isMobile) {
            dispatch({ type: 'READ_ONLY_OFF' });
        }

        // Save any unsaved changes
        dispatch(autoSave());
    }
}

export const setOffline = () => {
    return dispatch => {
        dispatch({ type: 'OFFLINE' });
        dispatch({ type: 'READ_ONLY_ON' });
    }
}
