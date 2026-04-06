import { Action } from "../types";

type MapMetaState = {
  currentMapId: number | null;
  unsavedMapUuid: string | null;
  isSnapshot: boolean;
  writeAccess: boolean;
  ownMap: boolean;
  lockedByOtherUserInitials: string | null;
  saving: boolean;
  saveError: boolean;
  lastSaved: string | null;
  clearingMap: boolean;
};

const INITIAL_STATE: MapMetaState = {
  currentMapId: null,
  unsavedMapUuid: null, // change this when opening new empty map, to differentiate unsaved maps
  isSnapshot: false,
  writeAccess: true,
  ownMap: true,
  lockedByOtherUserInitials: null, // initials of other user if they are locking map edits, else null
  saving: false,
  saveError: false,
  lastSaved: null,
  clearingMap: false,
};

type LoadMapPayload = {
  id: number;
  isSnapshot: boolean;
  writeAccess: boolean;
  ownMap: boolean;
  lastModified: string | null;
};

type NewMapPayload = {
  unsavedMapUuid: string;
};

type MapSavedPayload = {
  timestamp: string;
};

type MapLockedPayload = {
  userInitials: string;
};

type MapMetaAction =
  | (Action<LoadMapPayload> & { type: "LOAD_MAP" | "RELOAD_MAP" })
  | (Action<NewMapPayload> & { type: "NEW_MAP" })
  | (Action & { type: "MAP_SAVING" | "MAP_SAVE_ERROR" | "MAP_UNLOCKED" })
  | (Action<MapSavedPayload> & { type: "MAP_SAVED" })
  | (Action<MapLockedPayload> & { type: "MAP_LOCKED" })
  | Action;

export default (
  state: MapMetaState = INITIAL_STATE,
  action: MapMetaAction
): MapMetaState => {
  switch (action.type) {
    case "LOAD_MAP":
    case "RELOAD_MAP": {
      const { id, isSnapshot, writeAccess, ownMap, lastModified } =
        action.payload as LoadMapPayload;
      return {
        ...state,
        currentMapId: id,
        unsavedMapUuid: null,
        isSnapshot,
        writeAccess,
        ownMap,
        saving: false,
        lastSaved: lastModified,
      };
    }
    case "NEW_MAP": {
      const { unsavedMapUuid } = action.payload as NewMapPayload;
      return {
        ...INITIAL_STATE,
        unsavedMapUuid,
      };
    }
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
        lastSaved: (action.payload as MapSavedPayload).timestamp,
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
        lockedByOtherUserInitials: (action.payload as MapLockedPayload)
          .userInitials,
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
