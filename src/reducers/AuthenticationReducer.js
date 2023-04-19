const INITIAL_STATE = {
    authenticated: false,
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
                error: 'You have entered an invalid username or password.'
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
