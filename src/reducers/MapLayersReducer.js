const INITIAL_STATE = {
    landDataLayers: [],
}
let landDataLayers;
let layerId;
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_LAYER':
            landDataLayers = state.landDataLayers.slice();
            layerId = action.payload;
            if (landDataLayers.indexOf(layerId) !== -1) {
                landDataLayers = landDataLayers.filter(e => e !== layerId);
            } else {
                landDataLayers.push(layerId);
            }
            return {
                ...state,
                landDataLayers: landDataLayers
            }
        case 'LAYER_OFF':
            landDataLayers = state.landDataLayers.slice();
            layerId = action.payload;
            if (landDataLayers.indexOf(layerId) !== -1) {
                landDataLayers = landDataLayers.filter(e => e !== layerId);
            }
            return {
                ...state,
                landDataLayers: landDataLayers
            }
        case 'LAYER_ON':
            landDataLayers = state.landDataLayers.slice();
            layerId = action.payload;
            landDataLayers.push(layerId);
            return {
                ...state,
                landDataLayers: landDataLayers
            }
        case 'LOAD_MAP':
            return action.payload.mapLayers;
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}