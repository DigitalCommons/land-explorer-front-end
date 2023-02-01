const INITIAL_STATE = {
    currentMapId: null,
    isSnapshot: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_MAP_ID':
            return {
                ...state,
                currentMapId: action.payload
            }
        case 'CLEAR_MAP_ID':
            return {
                ...state,
                currentMapId: null,
            }
        case 'LOAD_MAP':
            return {
                ...state,
                currentMapId: action.id,
                isSnapshot: action.payload.isSnapshot
            }
        case 'NEW_MAP':
            return {
                ...state,
                currentMapId: null
            }
        default:
            return state;
    }
}
