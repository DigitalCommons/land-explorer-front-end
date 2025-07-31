const INITIAL_STATE = {
    landDataLayers: [],
}
let landDataLayers;
let layerId;
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "TOGGLE_LAYER":
        const toggleLayerId = action.payload;

        /**
         * #361 - Handle toggling of land data layers
         * If the layer is already in the array, remove it
         */
        if (state.landDataLayers.includes(toggleLayerId)) {
          return {
            ...state,
            landDataLayers: state.landDataLayers.filter(
              (id) => id !== toggleLayerId
            ),
          };
        } else {
          return {
            ...state,
            landDataLayers: [...state.landDataLayers, toggleLayerId],
          };
        }
      case "ADD_LAYER_TO_KEY":
        if (!state.landDataLayers.includes(action.payload)) {
          return {
            ...state,
            landDataLayers: [...state.landDataLayers, action.payload],
          };
        }
        return state;
      case "REMOVE_LAYER_FROM_KEY":
        return {
          ...state,
          landDataLayers: state.landDataLayers.filter(
            (id) => id !== action.payload
          ),
        };
      case "CLEAR_MAP_LAYERS":
        return {
          ...state,
          landDataLayers: [],
        };
      case "LOAD_MAP":
        return action.payload.data.mapLayers;
      case "NEW_MAP":
        return INITIAL_STATE;
      default:
        return state;
    }
}
