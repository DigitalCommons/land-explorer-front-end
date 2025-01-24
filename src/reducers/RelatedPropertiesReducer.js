const INITIAL_STATE = {
  properties: {},
  error: null,
  loading: false,
  proprietorName: null,
  selectedProperties: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_RELATED_PROPERTIES_SUCCESS":
      return {
        ...state,
        properties: action.payload,
        error: null,
        loading: false,
      };
    case "FETCH_RELATED_PROPERTIES_FAILURE":
      return {
        ...state,
        properties: {},
        selectedProperties: {},
        error: action.payload,
        loading: false,
      };
    case "FETCH_RELATED_PROPERTIES_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SELECT_PROPERTIES":
      return {
        ...state,
        selectedProperties: {
          ...state.selectedProperties,
          ...action.payload,
        },
      };
    case "CLEAR_SELECTED_PROPERTY":
      const propertyToClearId = action.payload;
      const { [propertyToClearId]: propertyToClear, ...selectedProperties } =
        state.selectedProperties;
      return {
        ...state,
        selectedProperties,
      };
    case "CLEAR_ALL_SELECTED_PROPERTIES":
      return {
        ...state,
        selectedProperties: {},
      };
    case "SET_PROPRIETOR_NAME":
      return {
        ...state,
        proprietorName: action.payload,
      };
    case "CLEAR_PROPRIETOR_NAME":
      return {
        ...state,
        proprietorName: null,
      };
    case "CLEAR_PROPERTIES_AND_PROPRIETOR_NAME":
      return {
        ...state,
        properties: {},
        proprietorName: null,
      };
    case "CLEAR_ALL_SELECTED_PROPERTY":
      return {
        ...state,
        selectedProperties: {},
      };
    default:
      return state;
  }
};
