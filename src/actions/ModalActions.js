import { getMyMaps } from "./MapActions";

export const openModal = (name) => {
    return dispatch => {
        if (name === 'myMaps' || name === 'mySharedMaps' || name === 'openMap') {
            // Refresh list of maps
            dispatch(getMyMaps());
        }

        dispatch({
            type: 'OPEN_MODAL',
            payload: name
        })
    }
}

export const closeModal = (name) => {
    return dispatch => {
        dispatch({
            type: 'CLOSE_MODAL',
            payload: name
        })
    }
}
