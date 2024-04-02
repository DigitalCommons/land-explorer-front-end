const INITIAL_STATE = {
  socketConnection: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SOCKET_CONNECT":
      return {
        ...state,
        socketConnection: action.payload,
      };
    case "SOCKET_DISCONNECT":
      return {
        ...state,
        socketConnection: null,
      };
    default:
      return state;
  }
};
