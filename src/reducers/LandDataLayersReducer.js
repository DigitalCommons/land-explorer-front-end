const INITIAL_STATE = {
    landDataLayers: [],
}
let landDataLayers;
let layerId;
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "TOGGLE_LAND_DATA_LAYER":
        landDataLayers = state.landDataLayers.slice();
        layerId = action.payload;
        if (landDataLayers.includes(layerId)) {
          landDataLayers = landDataLayers.filter((e) => e !== layerId);
        } else {
          landDataLayers.push(layerId);
        }
        return {
          ...state,
          landDataLayers: landDataLayers,
        };
      case "LOAD_MAP":
        return action.payload.data.mapLayers;
      case "NEW_MAP":
        return INITIAL_STATE;
      default:
        return state;
    }
}
