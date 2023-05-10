const INITIAL_STATE = {
    authenticated: true,
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGGED_IN': {
            return {
                authenticated: true,
                error: null
            }
        }
        case 'FAILED_LOGIN': {
            return {
                authenticated: false,
                error: action.payload.errorMessage
            }
        }
        case 'LOG_OUT': {
            return {
                authenticated: false,
                error: null
            }
        }
        case 'SESSION_TIMED_OUT': {
            return {
                authenticated: false,
                error: 'Your session has timed out. Please log back in.'
            }
        }
        default:
            return state;
    }
}
