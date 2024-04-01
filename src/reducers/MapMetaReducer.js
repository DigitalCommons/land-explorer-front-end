const INITIAL_STATE = {
  currentMapId: null,
  unsavedMapUuid: null, // change this when opening new empty map, to differentiate unsaved maps
  isSnapshot: false,
  writeAccess: true,
  ownMap: true,
  lockedByOtherUserInitials: null, // initials if other user if they have lock to edit map, else null
  saving: false,
  saveError: false,
  lastSaved: null,
  clearingMap: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOAD_MAP":
    case "RELOAD_MAP":
      const { id, isSnapshot, writeAccess, ownMap, lastModified } =
        action.payload;
      return {
        ...state,
        currentMapId: id,
        unsavedMapUuid: null,
        isSnapshot: isSnapshot,
        writeAccess: writeAccess,
        ownMap: ownMap,
        saving: false,
        lastSaved: lastModified,
      };
    case "NEW_MAP":
      const { unsavedMapUuid } = action.payload;
      return {
        ...INITIAL_STATE,
        unsavedMapUuid,
      };
    case "MAP_SAVING":
      return {
        ...state,
        saving: true,
      };
    case "MAP_SAVED":
      return {
        ...state,
        saving: false,
        saveError: false,
        lastSaved: action.payload.timestamp,
      };
    case "MAP_SAVE_ERROR":
      return {
        ...state,
        saving: false,
        saveError: true,
      };
    case "MAP_LOCKED":
      return {
        ...state,
        lockedByOtherUserInitials: action.payload.userInitials,
      };
    case "MAP_UNLOCKED":
      return {
        ...state,
        lockedByOtherUserInitials: null,
      };
    default:
      return state;
  }
};
