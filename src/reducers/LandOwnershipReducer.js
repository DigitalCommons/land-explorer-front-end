const INITIAL_STATE = {
  activeDisplay: null,
  visibleProperties: [],
  loadingProperties: false,
  highlightedProperties: {},
  activePropertyId: null,
  relatedProperties: {},
  relatedPropertiesError: null,
  relatedPropertiesLoading: false,
  relatedPropertiesProprietorName: null,
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
    case "CLEAR_HIGHLIGHTED_PROPERTIES":
      const propertyIdsToClear = action.payload;
      const rest = { ...state.highlightedProperties }; // Create a shallow copy
      propertyIdsToClear.forEach((id) => delete rest[id]);
      const activePropertyId = propertyIdsToClear.includes(
        state.activePropertyId
      )
        ? null
        : state.activePropertyId;

      return {
        ...state,
        highlightedProperties: rest,
        activePropertyId,
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
    case "FETCH_RELATED_PROPERTIES_SUCCESS":
      return {
        ...state,
        relatedProperties: action.payload,
        relatedPropertiesError: null,
        relatedPropertiesLoading: false,
      };
    case "FETCH_RELATED_PROPERTIES_FAILURE":
      return {
        ...state,
        relatedProperties: {},
        relatedPropertiesError: action.payload,
        relatedPropertiesLoading: false,
      };
    case "FETCH_RELATED_PROPERTIES_LOADING":
      return {
        ...state,
        relatedPropertiesLoading: true,
      };
    case "SET_RELATED_PROPERTIES_PROPRIETOR_NAME":
      return {
        ...state,
        relatedPropertiesProprietorName: action.payload,
      };
    case "CLEAR_RELATED_PROPERTIES_AND_PROPRIETOR_NAME":
      return {
        ...state,
        relatedProperties: {},
        relatedPropertiesProprietorName: null,
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
    case "NEW_MAP":
      return INITIAL_STATE;
    default:
      return state;
  }
};
