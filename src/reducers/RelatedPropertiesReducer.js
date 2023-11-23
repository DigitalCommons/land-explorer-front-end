const INITIAL_STATE = {
  properties: [],
  error: null,
  loading: false,
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
      return INITIAL_STATE;
    default:
      return state;
  }
};
