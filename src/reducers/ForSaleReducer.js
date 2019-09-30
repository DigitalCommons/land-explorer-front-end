const INITIAL_STATE = {
    activeMarkers: [],
}
let activeMarkers;
let layerId;
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TOGGLE_LAYER':
            activeMarkers = state.activeMarkers.slice();
            layerId = action.payload;
            if (activeMarkers.indexOf(layerId) !== -1) {
                activeMarkers = activeMarkers.filter(e => e !== layerId);
            } else {
                activeMarkers.push(layerId);
            }
            return {
                ...state,
                activeMarkers: activeMarkers
            }
        case 'LAYER_OFF':
            activeMarkers = state.activeMarkers.slice();
            layerId = action.payload;
            if (activeMarkers.indexOf(layerId) !== -1) {
                activeMarkers = activeMarkers.filter(e => e !== layerId);
            }
            return {
                ...state,
                activeMarkers: activeMarkers
            }
        case 'LAYER_ON':
            activeMarkers = state.activeMarkers.slice();
            layerId = action.payload;
            activeMarkers.push(layerId);
            return {
                ...state,
                activeMarkers: activeMarkers
            }
        case 'LOAD_MAP':
            return action.payload.mapLayers;
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}