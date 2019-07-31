const INITIAL_STATE = {
    activeLayers: [],
}
let activeLayers;
let layerId;
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TOGGLE_LAYER':
            activeLayers = state.activeLayers.slice();
            layerId = action.payload;
            if (activeLayers.indexOf(layerId) !== -1) {
                activeLayers = activeLayers.filter(e => e !== layerId);
            } else {
                activeLayers.push(layerId);
            }
            return {
                ...state,
                activeLayers: activeLayers
            }
        case 'LAYER_OFF':
            activeLayers = state.activeLayers.slice();
            layerId = action.payload;
            if (activeLayers.indexOf(layerId) !== -1) {
                activeLayers = activeLayers.filter(e => e !== layerId);
            }
            return {
                ...state,
                activeLayers: activeLayers
            }
        case 'LAYER_ON':
            activeLayers = state.activeLayers.slice();
            layerId = action.payload;
            activeLayers.push(layerId);
            return {
                ...state,
                activeLayers: activeLayers
            }
        case 'LOAD_MAP':
            return action.payload.mapLayers;
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}