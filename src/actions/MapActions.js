import axios from 'axios';
import constants from "../constants";


export const getMyMaps = () => {
    return dispatch => {
        axios.get(`${constants.ROOT_URL}/api/user/maps/`)
            .then((response) => {
                console.log("got maps, response", response);
                dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
            })
            .catch((err) => {
                console.log("couldn't get maps", err);
            })
    }
}

export const setLngLat = (lngLat) => {
    return dispatch => {
        dispatch({
            type: 'SET_LNG_LAT',
            payload: lngLat
        })
    }
}

export const setCurrentLocation = (lngLat) => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENT_LOCATION',
            payload: lngLat
        })
    }
}

export const zoomIn = () => {
    return dispatch => {
        dispatch({ type: 'ZOOM_IN' })
    }
}

export const zoomOut = () => {
    return dispatch => {
        dispatch({ type: 'ZOOM_OUT' })
    }
}

export const setZoom = (zoom) => {
    return dispatch => {
        dispatch({
            type: 'SET_ZOOM',
            payload: zoom
        })
    }
}

export const setSearchMarker = (payload) => {
    return dispatch => {
        dispatch({
            type: 'SET_SEARCH_MARKER',
            payload: payload,
        })
    }
}

export const clearSearchMarker = () => {
    return dispatch => {
        dispatch({ type: 'CLEAR_SEARCH_MARKER' });
    }
}