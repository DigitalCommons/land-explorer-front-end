const INITIAL_STATE = {
    authenticated: false,
    loggedIn: false,
    token: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOG_IN':
            return {
                ...state,
                loggedIn: true
            }
        case 'LOG_OUT':
            return {
                ...state,
                loggedIn: false
            }
        case 'AUTHENTICATE': {
            return {
                ...state,
                authenticated: true
            }
        }
        case 'DE_AUTHENTICATE': {
            return {
                ...state,
                authenticated: false
            }
        }
        case 'SET_TOKEN': {
            return {
                ...state,
                token: action.payload,
                tokenExpiry: Math.round(new Date().getTime() / 1000) + (24 * 3600),
            }
        }
        default:
            return state;
    }
}