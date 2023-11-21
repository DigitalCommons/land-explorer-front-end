const INITIAL_STATE = {
  properties: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_PROPERTIES_SUCCESS":
      return {
        ...state,
        properties: action.payload,
        error: null,
      };
    case "FETCH_PROPERTIES_FAILURE":
      return {
        ...state,
        properties: [],
        error: action.payload,
      };
    case "CLEAR_PROPERTIES":
      return INITIAL_STATE;
    default:
      return state;
  }
};
