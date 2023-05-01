import { isMobile } from 'react-device-detect';

/**
 * Set the read-only state. Read-only should be enabled if any of the following are true:
 * - we are offline
 * - the current map is a snapshot
 * - the user doesn't have write access for the current map
 * - we're on a mobile device
 */
export const updateReadOnly = () => {
    return (dispatch, getState) => {
        const { isSnapshot, writeAccess } = getState().mapMeta;
        const isOnline = getState().connectivity.isOnline;

        if (!isOnline || isSnapshot || !writeAccess || isMobile) {
            dispatch({ type: 'READ_ONLY_ON' });
        } else {
            dispatch({ type: 'READ_ONLY_OFF' });
        }
    }
}
