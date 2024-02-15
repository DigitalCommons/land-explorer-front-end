const INITIAL_STATE = {
    currentMapId: null,
    unsavedMapUuid: null, // change this when opening new empty map, to differentiate unsaved maps
    isSnapshot: false,
    writeAccess: true,
    locked: false,
    saving: false,
    saveError: false,
    lastSaved: null,
    clearingMap: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_MAP':
            const { id, isSnapshot, writeAccess, lastModified, isLocked } = action.payload;
            return {
                ...state,
                currentMapId: id,
                unsavedMapUuid: null,
                isSnapshot: isSnapshot,
                writeAccess: writeAccess,
                locked: isLocked,
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
        case 'MAP_LOCKED':
            return {
                ...state,
                locked: action.payload.isLocked
            }
        default:
            return state;
    }
}
