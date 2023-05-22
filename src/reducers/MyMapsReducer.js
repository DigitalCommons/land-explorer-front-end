const INITIAL_STATE = {
    maps: [],
    error: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'POPULATE_MY_MAPS':
            return {
                maps: action.payload,
                error: false
            }
        case 'MY_MAPS_ERROR':
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}
