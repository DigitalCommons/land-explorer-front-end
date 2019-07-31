const INITIAL_STATE = {
    zoom: [6],
    lngLat: [-1.59, 53.9],
    searchMarker: null,
    marker: [-0.2416815, 51.5285582],
    gettingLocation: false,
    currentLocation: null,
    movingMethod: 'flyTo',
    name: 'New Map',
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ZOOM_IN':
            if (state.zoom[0] < 20) {
                return {
                    ...state,
                    zoom: [Math.floor(state.zoom[0] + 1)]
                }
            } else {
                return {
                    ...state,
                }
            }
        case 'ZOOM_OUT':
            if (state.zoom[0] > 6.5) {
                return {
                    ...state,
                    zoom: [Math.ceil(state.zoom[0] - 1)]
                }
            } else {
                return {
                    ...state,
                }
            }
        case 'SET_ZOOM':
            return {
                ...state,
                zoom: action.payload
            }
        case 'SET_LNG_LAT':
            return {
                ...state,
                lngLat: [action.payload.lng, action.payload.lat]
            }
        case 'GETTING_LOCATION':
            return {
                ...state,
                gettingLocation: action.payload
            }
        case 'SET_CURRENT_LOCATION':
            return {
                ...state,
                currentLocation: action.payload
            }
        case 'SET_SEARCH_MARKER':
            return {
                ...state,
                searchMarker: action.payload
            }
        case 'CLEAR_SEARCH_MARKER':
            return {
                ...state,
                searchMarker: null
            }
        case 'SET_MARKER':
            return {
                ...state,
                marker: action.payload
            }
        case 'CLEAR_MARKER':
            return {
                ...state,
                marker: null,
            }
        case 'CHANGE_MOVING_METHOD':
            return {
                ...state,
                movingMethod: action.payload
            }
        case 'SAVE_MAP':
            return action.payload.map;
        case 'LOAD_MAP':
            return {
                ...action.payload.map,
                movingMethod: 'jumpTo'
            }
        case 'NEW_MAP':
            return {
                ...INITIAL_STATE,
                movingMethod: 'jumpTo'
            };
        default:
            return state;
    }
}