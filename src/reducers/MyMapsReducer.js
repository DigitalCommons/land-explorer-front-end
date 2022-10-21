const INITIAL_STATE = {
    maps: [],
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'POPULATE_MY_MAPS':
            return {
                ...state,
                maps: action.payload
            }
        case 'MAP_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}