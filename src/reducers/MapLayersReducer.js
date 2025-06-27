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
      /**
       * #361 - Ensure a specific layer is in the key
       * If the layer is not already in the key, add it
       */
      case "ENSURE_LAYER_IN_KEY":
        // Get the new layer ID
        const newLayerId = action.payload;

        // Create a list of all ownership layer IDs
        const ownershipLayers = [
          "all",
          "localAuthority",
          "churchOfEngland",
          "pending",
        ];

        // Check if this is an ownership layer
        const isOwnershipLayer = ownershipLayers.includes(newLayerId);

        if (isOwnershipLayer) {
          // If an ownership layer, ensure it's the only one in the key
          const filteredLayers = state.landDataLayers.filter(
            (id) => !ownershipLayers.includes(id) || id === newLayerId
          );

          // If this layer is not already in the list, add it
          if (!filteredLayers.includes(newLayerId)) {
            return {
              ...state,
              landDataLayers: [...filteredLayers, newLayerId],
            };
          }

          return {
            ...state,
            landDataLayers: filteredLayers,
          };
        }

        // For non-ownership layers, just add if not present
        if (!state.landDataLayers.includes(newLayerId)) {
          return {
            ...state,
            landDataLayers: [...state.landDataLayers, newLayerId],
          };
        }
        return state;
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
