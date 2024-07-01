const INITIAL_STATE = {
  displayActive: false,
  pendingDisplayActive: false,
  highlightedProperties: {},
  activePropertyId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_PROPERTY_DISPLAY":
      return {
        ...state,
        displayActive: !state.displayActive,
      };
    case "TOGGLE_PENDING_PROPERTY_DISPLAY":
      return {
        ...state,
        pendingDisplayActive: !state.pendingDisplayActive,
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
      // this could be undefined for old maps
      const displayActive =
        action.payload.data.mapLayers.ownershipDisplay || false;
      return {
        ...state,
        displayActive,
      };
    default:
      return state;
  }
};
