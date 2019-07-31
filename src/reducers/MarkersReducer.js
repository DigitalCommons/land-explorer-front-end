const INITIAL_STATE = {
    searchMarker: [-0.2416815, 51.5285582],
    currentMarker: null,
    id: 1,
    markers: [],
}

export default (state = INITIAL_STATE, action) => {
    let markers;
    let currentMarker;
    switch(action.type) {
        case 'SET_MARKER':
            markers = state.markers.slice();
            markers.push({
                id: state.id + 1,
                coordinates: action.payload,
                name: `Marker ${state.id + 1}`,
                description: ""
            });
            return {
                ...state,
                markers,
                id: state.id + 1,
                currentMarker: state.id + 1
            }
        case 'CLEAR_MARKER':
            markers = state.markers.slice();
            markers = markers.filter((marker) => marker.id !== action.payload);
            currentMarker = action.payload === state.currentMarker ? null : state.currentMarker;
            return {
                ...state,
                markers,
                currentMarker
            }
        case 'RENAME_MARKER':
            markers = state.markers.slice();
            markers = markers.map((marker) => {
                if (marker.id === action.payload.id) {
                    return {
                        ...marker,
                        name: action.payload.name
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
        case 'LOAD_MAP':
            return action.payload.markers;
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}