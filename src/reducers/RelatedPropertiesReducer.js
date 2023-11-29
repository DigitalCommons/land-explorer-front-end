const INITIAL_STATE = {
  properties: [],
  error: null,
  loading: false,
  proprietorName: null,
  activePropertyId: null,
  selectedProperty: [],
};

let propertyToClear;
let selectedProperty;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_PROPERTIES_SUCCESS":
      return {
        ...state,
        properties: action.payload,
        error: null,
        loading: false,
      };
    case "FETCH_PROPERTIES_FAILURE":
      return {
        ...state,
        properties: [],
        error: action.payload,
        loading: false,
      };
    case "FETCH_PROPERTIES_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_PROPERTIES":
      return {
        ...state,
        properties: [],
      };
    case "SET_SELECTED_PROPERTY":
      return {
        ...state,
        selectedProperty: [...state.selectedProperty, action.payload],
      };
    case "CLEAR_SELECTED_PROPERTY":
      propertyToClear = action.payload;
      selectedProperty = state.selectedProperty.filter(
        (property) => property[0].poly_id !== propertyToClear[0].poly_id
      );
      return {
        ...state,
        selectedProperty,
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
        properties: [],
        proprietorName: null
      };
    case "SET_ACTIVE_PROPERTY_ID":
      return INITIAL_STATE;
    case "SET_SELECTED_PROPERTY":
      return {
        ...state,
        selectedProperty: [...state.selectedProperty, action.payload],
      };
    case "CLEAR_ALL_SELECTED_PROPERTY":
      return {
        ...state,
        selectedProperty: [],
      };
    default:
      return state;
  }
};
