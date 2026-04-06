import { getMyMaps } from "./MapActions";

export const openModal = (name: string) => {
    return (dispatch: any) => {
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

export const closeModal = (name: string) => {
    return (dispatch: any) => {
        dispatch({
            type: 'CLOSE_MODAL',
            payload: name
        })
    }
}
