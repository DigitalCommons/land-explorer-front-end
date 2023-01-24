import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
    searchMarker: [-0.2416815, 51.5285582],
    currentMarker: null,
    markersDrawn: 0,
    markers: [],
}

export default (state = INITIAL_STATE, action) => {
    let markers;
    let currentMarker;
    switch (action.type) {
        case 'SET_MARKER':
            markers = state.markers.slice();
            const uuid = uuidv4();
            const markersDrawn = state.markersDrawn || 0;
            markers.push({
                uuid: uuid,
                coordinates: action.payload,
                name: `Marker ${markersDrawn + 1}`,
                description: ""
            });
            return {
                ...state,
                markers,
                markersDrawn: markersDrawn + 1,
                currentMarker: uuid
            }
        case 'CLEAR_MARKER':
            markers = state.markers.slice();
            markers = markers.filter((marker) => marker.uuid !== action.payload);
            currentMarker = action.payload === state.currentMarker ? null : state.currentMarker;
            return {
                ...state,
                markers,
                currentMarker
            }
        case 'RENAME_MARKER':
            markers = state.markers.slice();
            markers = markers.map((marker) => {
                if (marker.uuid === action.payload.uuid) {
                    return {
                        ...marker,
                        name: action.payload.name,
                        description: action.payload.description,
                    }
                } else {
                    return marker;
                }
            })
            return {
                ...state,
                markers: markers
            }
        case 'SET_CURRENT_MARKER':
            return {
                ...state,
                currentMarker: action.payload
            }
        case 'CLEAR_CURRENT_MARKER':
            return {
                ...state,
                currentMarker: null,
            }
        case 'SET_ACTIVE_POLYGON':
            return {
                ...state,
                currentMarker: null
            }
        case 'LOAD_MAP_STATIONARY':
        case 'LOAD_MAP':
            return action.payload.markers;
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}
