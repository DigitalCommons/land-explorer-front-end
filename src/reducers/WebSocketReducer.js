const INITIAL_STATE = {
    // socketConnectionError: false,
    // socketConnectionErrorMessage: null,
    // socketConnectionRetries: 0,
    // socketConnectionMaxRetries: 5,
    // socketConnectionRetryInterval: 1000,
    // socketConnectionTimeout: 5000,
    socketConnection: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SOCKET_CONNECT":
            return {
                ...state,
                // socketConnectionError: false,
                // socketConnectionErrorMessage: null,
                // socketConnectionRetries: 0,
                socketConnection: action.payload,
            };
        case "SOCKET_DISCONNECT":
            return {
                ...state,
                socketConnection: null,
            };
        // case "SOCKET_CONNECTION_ERROR":
        //     return {
        //         ...state,
        //         socketConnectionError: true,
        //         socketConnectionErrorMessage: action.payload,
        //     };
        // case "SOCKET_CONNECTION_RETRY":
        //     return {
        //         ...state,
        //         socketConnectionRetries: state.socketConnectionRetries + 1,
        //     };
        // case "SOCKET_CONNECTION_RESET":
        //     return {
        //         ...state,
        //         socketConnectionRetries: 0,
        //     };
        default:
            return state;
    }
};

