const INITIAL_STATE = {
    currentMapId: null,
    isSnapshot: null,
    saving: false,
    saveError: false,
    lastSaved: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_MAP':
            const { id, isSnapshot, lastModified } = action.payload;
            return {
                ...state,
                currentMapId: id,
                isSnapshot: isSnapshot,
                saving: false,
                lastSaved: lastModified
            }
        case 'NEW_MAP':
            return INITIAL_STATE;
        case 'MAP_SAVING':
            return {
                ...state,
                saving: true
            }
        case 'MAP_SAVED':
            return {
                ...state,
                saving: false,
                saveError: false,
                lastSaved: action.payload.timestamp
            }
        case 'MAP_SAVE_ERROR':
            return {
                ...state,
                saving: false,
                saveError: true
            }
        default:
            return state;
    }
}
