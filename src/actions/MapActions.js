import axios from 'axios';
import constants, { VERSION } from '../constants';
import { getAuthHeader } from "../utils/Auth";

export const getMyMaps = () => {
    return async dispatch => {
        const response = await axios.get(`${constants.ROOT_URL}/api/user/maps`, getAuthHeader());
        console.log("Got maps, response", response);

        return dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
    }
}

/** Get my maps from backend and reload the current map */
export const reloadCurrentMap = () => {
    return async (dispatch, getState) => {
        await dispatch(getMyMaps());

        const currentMapId = getState().mapMeta.currentMapId;
        if (currentMapId !== null) {
            console.log("Reloading currently open map", currentMapId);
            const currentMap = getState().myMaps.maps.find(map => map.map.eid === currentMapId);
            const savedMap = JSON.parse(currentMap.map.data);

            // TODO: move this logic that mends JSON to backend
            if (savedMap.mapLayers.activeLayers) {
                savedMap.mapLayers.landDataLayers = savedMap.mapLayers.activeLayers;
            }
            //fix that some have no dataLayers
            if (!savedMap.mapLayers.myDataLayers) {
                savedMap.mapLayers.myDataLayers = [];
            }

            return dispatch({
                type: 'LOAD_MAP',
                payload: savedMap,
                id: currentMapId
            });
        }
    }
}

/**
 * If both 'copy' and 'snapshot' are false, we will save to existing map, or create a new map if it
 * is a new map.
 * 
 * @param {*} copy true if we are saving a copy of the current map
 * @param {*} snapshot true if we are saving a snapshot of the current map
 * @param {*} name the name of the map that we want to save. If left undefined, we will use the name
 * of the existing map, or an empty string if this is a new map.
 */
export const saveCurrentMap = (copy = false, snapshot = false, name = undefined) => {
    return async (dispatch, getState) => {
        const map = getState().map;
        const saveName = name !== undefined ? name : map.name || '';

        const saveData = {
            map: {
                ...map,
                gettingLocation: false,
                name: saveName,
                currentLocation: null,
                searchMarker: null,
            },
            drawings: getState().drawings,
            markers: getState().markers,
            mapLayers: {
                landDataLayers: getState().mapLayers.landDataLayers,
                myDataLayers: getState().dataGroups.activeGroups
            },
            version: VERSION,
            name: saveName,

        };

        console.log(`Saving current map, copy:${copy} snapshot:${snapshot} data:`, saveData);

        const body = {
            "eid": (copy || snapshot) ? null : getState().mapMeta.currentMapId,
            "name": saveName,
            "data": JSON.stringify(saveData),
            "isSnapshot": snapshot || getState().mapMeta.isSnapshot
        };

        return await axios.post(`${constants.ROOT_URL}/api/user/map/save`, body, getAuthHeader());
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
