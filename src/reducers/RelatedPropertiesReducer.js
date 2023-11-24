const INITIAL_STATE = {
  properties: [],
  error: null,
  loading: false,
  proprietorName: null,
};

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
        proprietorName: null,
      };
    default:
      return state;
  }
};
