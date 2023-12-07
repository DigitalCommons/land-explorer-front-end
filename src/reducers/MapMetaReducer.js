const INITIAL_STATE = {
    currentMapId: null,
    unsavedMapUuid: null, // change this when opening new empty map, to differentiate unsaved maps
    isSnapshot: false,
    writeAccess: true,
    saving: false,
    saveError: false,
    lastSaved: null,
    clearingMap: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_MAP':
            const { id, isSnapshot, writeAccess, lastModified } = action.payload;
            return {
                ...state,
                currentMapId: id,
                unsavedMapUuid: null,
                isSnapshot: isSnapshot,
                writeAccess: writeAccess,
                saving: false,
                lastSaved: lastModified
            }
        case 'NEW_MAP':
            const { unsavedMapUuid } = action.payload;
            return {
                ...INITIAL_STATE,
                unsavedMapUuid
            };
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
