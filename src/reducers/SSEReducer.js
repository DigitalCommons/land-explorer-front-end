const INITIAL_STATE = {
  isSSEConnection: false,
  sseConnectionError: false,
  sseConnectionErrorMessage: null,
  sseConnectionRetries: 0,
  sseConnectionMaxRetries: 5,
  sseConnectionRetryInterval: 1000,
  sseConnectionTimeout: 5000,
  sseConnection: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SSE_CONNECT":
      return {
        ...state,
        isSSEConnection: true,
        sseConnection: action.payload,
        sseConnectionError: false,
        sseConnectionErrorMessage: null,
        sseConnectionRetries: 0,
      };
    case "SSE_DISCONNECT":
      return {
        ...state,
        isSSEConnection: false,
        sseConnection: null,
      };
    case "SSE_CONNECTION_ERROR":
      return {
        ...state,
        sseConnectionError: true,
        sseConnectionErrorMessage: action.payload,
      };
    case "SSE_CONNECTION_RETRY":
      return {
        ...state,
        sseConnectionRetries: state.sseConnectionRetries + 1,
      };
    case "SSE_CONNECTION_RESET":
      return {
        ...state,
        sseConnectionRetries: 0,
      };
    default:
      return state;
  }
};
