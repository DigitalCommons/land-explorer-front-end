const INITIAL_STATE = {
  activeDisplay: null,
  visibleProperties: [],
  loadingProperties: false,
  highlightedProperties: {},
  activePropertyId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_PROPERTY_DISPLAY":
      const displayType = action.payload;
      if (state.activeDisplay === displayType) {
        // if this type was already on, turn it off
        return {
          ...state,
          activeDisplay: null,
        };
      }
      // otherwise, replace the active display with this type
      return {
        ...state,
        activeDisplay: displayType,
      };
    case "SET_LOADING_PROPERTIES":
      return {
        ...state,
        loadingProperties: action.payload,
      };
    case "SET_VISIBLE_PROPERTIES":
      return {
        ...state,
        visibleProperties: action.payload,
      };
    case "HIGHLIGHT_PROPERTIES":
      return {
        ...state,
        highlightedProperties: {
          ...state.highlightedProperties,
          ...action.payload,
        },
      };
    case "CLEAR_HIGHLIGHTED_PROPERTY":
      const propertyToClearId = action.payload;
      const { [propertyToClearId]: propertyToClear, ...highlightedProperties } =
        state.highlightedProperties;
      return {
        ...state,
        highlightedProperties,
        activePropertyId: null,
      };
    case "CLEAR_ALL_HIGHLIGHTED_PROPERTIES":
      return {
        ...state,
        highlightedProperties: {},
        activePropertyId: null,
      };
    case "SET_ACTIVE_PROPERTY":
      return {
        ...state,
        activePropertyId: action.payload,
      };
    case "CLEAR_ACTIVE_PROPERTY":
      return {
        ...state,
        activePropertyId: null,
      };
    case "LOAD_MAP":
      // this could be undefined, or just 'true' for old maps
      const ownershipDisplay =
        action.payload.data.mapLayers.ownershipDisplay || null;
      if (ownershipDisplay === true) {
        return {
          ...state,
          activeDisplay: "all",
        };
      }
      return {
        ...state,
        activeDisplay: ownershipDisplay,
      };
    default:
      return state;
  }
};
