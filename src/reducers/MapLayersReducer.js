const INITIAL_STATE = {
    landDataLayers: [],
}
let landDataLayers;
let layerId;
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "TOGGLE_LAYER":
        const toggleLayerId = action.payload;

        // If the layer is already in the array, remove it
        if (state.landDataLayers.includes(toggleLayerId)) {
          return {
            ...state,
            landDataLayers: state.landDataLayers.filter(
              (id) => id !== toggleLayerId
            ),
          };
        }
        // Otherwise add it
        else {
          return {
            ...state,
            landDataLayers: [...state.landDataLayers, toggleLayerId],
          };
        }
      // In your MapLayersReducer.js
      case "ENSURE_LAYER_IN_KEY":
        // Don't modify action.payload, assign it to a new variable
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
          // Filter out all other ownership layers
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
      case "LOAD_MAP":
        return action.payload.data.mapLayers;
      case "NEW_MAP":
        return INITIAL_STATE;
      default:
        return state;
    }
}
