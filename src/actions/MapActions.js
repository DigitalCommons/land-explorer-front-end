import { VERSION } from "../constants";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { getRequest, postRequest } from "./RequestActions";
import { updateReadOnly } from "./ReadOnlyActions";
import { sendCurrentMap } from "./WebSocketActions";
import constants from "../constants";
import { io } from "socket.io-client";
import { getAuthHeader } from "../utils/Auth";

export const getMyMaps = () => {
  return async (dispatch) => {
    const mapsData = await dispatch(getRequest("/api/user/maps"));
    if (mapsData) {
      console.log("Got my maps", mapsData);
      dispatch({ type: "POPULATE_MY_MAPS", payload: mapsData });
    } else {
      dispatch({ type: "MY_MAPS_ERROR" });
    }
  };
};

/** Get my maps from backend and reload the current map */
const reloadCurrentMap = () => {
  return async (dispatch, getState) => {
    const currentMapId = getState().mapMeta.currentMapId;
    if (currentMapId !== null) {
      console.log("Reloading currently open map", currentMapId);
      await dispatch(getMyMaps());
      dispatch(openMap(currentMapId));
    }
  };
};

/** Get my maps from backend and load the map created most recently */
export const loadNewestMap = () => {
  return async (dispatch, getState) => {
    await dispatch(getMyMaps());

    const myMaps = getState().myMaps.maps;

    if (myMaps.length > 0) {
      const newMap = myMaps[myMaps.length - 1];
      const newMapId = newMap.map.eid;

      console.log("Opening newest map", newMapId);
      dispatch(openMap(newMapId));
    }
  };
};

/** Open specified map (if it exists in My Maps) */
export const openMap = (mapId) => {
  return async (dispatch, getState) => {
    console.log("Opening map", mapId);
    // await dispatch(checkMapLock(mapId));

    const map = getState().myMaps.maps.find((item) => item.map.eid === mapId);
    if (map) {
      const mapData = JSON.parse(map.map.data);
      const isSnapshot = map.map.isSnapshot;
      const lastModified = map.map.lastModified;
      // access level changed from equalling "WRITE" to excluding "READ"
      const writeAccess = map.access != "READ";
      const locked = getState().map.locked;

      dispatch({
        type: "LOAD_MAP",
        payload: {
          data: mapData,
          id: mapId,
          isSnapshot: isSnapshot,
          writeAccess: writeAccess,
          locked: locked,
          lastModified: shortenTimestamp(lastModified),
        },
      });
      console.log("Write access:", writeAccess);
      console.log("map data:", mapData, "map id:", mapId);
      dispatch(updateReadOnly());

      setTimeout(() => {
        dispatch({
          type: "CHANGE_MOVING_METHOD",
          payload: "flyTo",
        });
      }, 1000);

      dispatch(postRequest("/api/user/map/view", { eid: mapId }));
      dispatch(sendCurrentMap());
    }
  };
};

export const deleteMap = (mapId) => {
  return async (dispatch, getState) => {
    const success = await dispatch(
      postRequest("/api/user/map/delete", { eid: mapId })
    );

    if (success) {
      const currentMapId = getState().mapMeta.currentMapId;

      if (mapId === currentMapId) {
        dispatch(newMap());
      }
      await dispatch(getMyMaps());
    }
  };
};

export const newMap = () => {
  return (dispatch) => {
    dispatch({
      type: "NEW_MAP",
      payload: { unsavedMapUuid: uuidv4() },
    });
    setTimeout(() => {
      dispatch({ type: "CHANGE_MOVING_METHOD", payload: "flyTo" });
    }, 500);
    dispatch(updateReadOnly());
  };
};

/**
 * If both 'copy' and 'snapshot' are false, we will save to existing map, or create a new map if it
 * is a new map.
 *
 * @param {boolean} copy true if we are saving a copy of the current map
 * @param {boolean} snapshot true if we are saving a new snapshot of the current map
 * @param {string | undefined} name the name of the map that we want to save. If left undefined, we
 * will use the name of the existing map.
 * @return {boolean} true if save was successful.
 */
export const saveCurrentMap = (
  copy = false,
  snapshot = false,
  name = undefined
) => {
  return async (dispatch, getState) => {
    const map = getState().map;
    const saveName = copy
      ? `Copy of ${map.name}`
      : name || map.name || "Untitled Map";

    const saveData = {
      map: {
        ...map,
        name: saveName,
      },
      drawings: getState().drawings,
      markers: getState().markers,
      mapLayers: {
        landDataLayers: getState().mapLayers.landDataLayers,
        myDataLayers: getState().dataGroups.activeGroups,
        ownershipDisplay: getState().landOwnership.displayActive,
      },
      version: VERSION,
      name: saveName,
    };

    console.log(
      `Saving current map, copy:${copy} snapshot:${snapshot} data:`,
      saveData
    );

    const body = {
      eid: copy || snapshot ? null : getState().mapMeta.currentMapId,
      name: saveName,
      data: JSON.stringify(saveData),
      isSnapshot: snapshot || getState().mapMeta.isSnapshot,
    };

    return await dispatch(saveMapRequest("/api/user/map/save", body));
  };
};

/** Save the current map if it is saved, otherwise do nothing. Return false iff error when saving */
export const autoSave = () => {
  return async (dispatch, getState) => {
    if (getState().mapMeta.currentMapId) {
      return await dispatch(saveCurrentMap());
    }
    return true;
  };
};

/** Save the object data to a specified map. Return false iff failed to save to backend. */
export const saveObjectToMap = (type, data, mapId) => {
  return async (dispatch, getState) => {
    const copyToCurrentMap = mapId === getState().mapMeta.currentMapId;

    if (copyToCurrentMap) {
      // First save current changes, in case there are any new, unsaved objects.
      // Otherwise, they will later overwrite the object that is being copied.
      // TODO: can remove this when saving to backend no longer overwrites all existing objects
      const success = await dispatch(autoSave());
      if (!success) return false;
    }

    const body = {
      object: data,
      eid: mapId,
    };
    const success = await dispatch(
      saveMapRequest(`/api/user/map/save/${type}`, body)
    );

    if (success && copyToCurrentMap) {
      // so that it appears on the current map
      await dispatch(reloadCurrentMap());
    }
    return success;
  };
};

/** Edit the specified object's name and description. Return false iff failed to save to backend. */
export const editMapObjectInfo = (type, uuid, newName, newDescription) => {
  return async (dispatch, getState) => {
    const payload = {
      uuid,
      name: newName,
      description: newDescription,
    };

    dispatch({
      type: type === "marker" ? "RENAME_MARKER" : "RENAME_POLYGON",
      payload,
    });

    // If we are working on a saved map
    if (getState().mapMeta.currentMapId) {
      return await dispatch(saveMapRequest(`/api/user/edit/${type}`, payload));
    }
    return true;
  };
};

export const setLngLat = (lng, lat) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LNG_LAT",
      payload: [lng, lat],
    });

    const currentMapId = getState().mapMeta.currentMapId;
    // If map is saved, save to back-end
    if (currentMapId) {
      const body = {
        eid: currentMapId,
        lngLat: [lng, lat],
      };
      await dispatch(saveMapRequest("/api/user/map/save/lngLat", body));
    }
  };
};

export const setCurrentLocation = (lng, lat) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CURRENT_LOCATION",
      payload: [lng, lat],
    });
  };
};

const saveMapZoom = (mapId, zoom) => {
  return async (dispatch) => {
    const body = {
      eid: mapId,
      zoom: zoom,
    };
    await dispatch(saveMapRequest("/api/user/map/save/zoom", body));
  };
};

export const zoomIn = () => {
  return (dispatch, getState) => {
    dispatch({ type: "ZOOM_IN" });

    // If map is saved, save current Zoom to back-end
    const currentMapId = getState().mapMeta.currentMapId;
    if (currentMapId) {
      dispatch(saveMapZoom(currentMapId, getState().map.zoom));
    }
  };
};

export const zoomOut = () => {
  return (dispatch, getState) => {
    dispatch({ type: "ZOOM_OUT" });

    // If map is saved, save current Zoom to back-end
    const currentMapId = getState().mapMeta.currentMapId;
    if (currentMapId) {
      dispatch(saveMapZoom(currentMapId, getState().map.zoom));
    }
  };
};

export const setZoom = (zoom) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_ZOOM",
      payload: zoom,
    });

    // If map is saved, save current Zoom to back-end
    const currentMapId = getState().mapMeta.currentMapId;
    if (currentMapId) {
      dispatch(saveMapZoom(currentMapId, getState().map.zoom));
    }
  };
};

export const setSearchMarker = (lng, lat) => {
  return (dispatch) => {
    dispatch({
      type: "SET_SEARCH_MARKER",
      payload: [lng, lat],
    });
  };
};

export const clearSearchMarker = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_MARKER" });
  };
};

/**
 * Make a POST request to the given API endpoint. Set the map saving and error state according to
 * what happens with the request.
 *
 * @param {string} endpoint the API endpoint, starting '/api/'
 * @param {any} body the data to include in the POST request
 * @returns {boolean} whether the save was successful
 */
const saveMapRequest = (endpoint, body) => {
  return async (dispatch, getState) => {
    const currentSaveError = getState().mapMeta.saveError;
    dispatch({ type: "MAP_SAVING" });

    const success = await dispatch(postRequest(endpoint, body));

    if (success) {
      dispatch({
        type: "MAP_SAVED",
        payload: {
          timestamp: moment().format("HH:mm"),
        },
      });

      if (currentSaveError && endpoint !== "/api/user/map/save") {
        console.log("There was previously a save error so save the whole map");
        dispatch(saveCurrentMap());
      }

      return true;
    }

    dispatch({ type: "MAP_SAVE_ERROR" });
    return false;
  };
};

const shortenTimestamp = (timestamp) => {
  const isToday = moment(timestamp).isSame(moment(), "day");
  if (isToday) {
    return moment(timestamp).format("HH:mm");
  } else {
    return moment(timestamp).format("DD/MM/YY");
  }
};

// #306 Enable multiple users to write to a map
// M.S. Lock and unlock the map when a user writes to it

export const lockMap = () => {
  return async (dispatch, getState) => {
    const mapId = getState().mapMeta.currentMapId;
    const success = await dispatch(
      postRequest("/api/user/map/lock", { mapId: mapId })
    );
    if (success) {
      dispatch({ type: "LOCK_MAP" });
    }
  };
};

export const unlockMap = () => {
  return async (dispatch, getState) => {
    const mapId = getState().mapMeta.currentMapId;
    const success = await dispatch(
      postRequest("/api/user/map/unlock", { mapId: mapId })
    );
    if (success) {
      dispatch({ type: "UNLOCK_MAP" });
    }
  };
};

// #306 Enable multiple users to write to a map
// M.S. Toggle the lock status of the map

export const toggleMapLock = () => {
  return async (dispatch, getState) => {
    const mapId = getState().mapMeta.currentMapId;
    const locked = getState().map.locked;
    if (locked) {
      dispatch(unlockMap(mapId));
    } else {
      dispatch(lockMap(mapId));
    }
  };
};

// #306 Enable multiple users to write to a map
// M.S. Check if the map is locked and dispatch actions based on the lock status

export const checkMapLock = (mapId) => {
  return async (dispatch, getState) => {
    try {
      const response = await dispatch(
        getRequest(`/api/user/map/lockStatus?mapId=${mapId}`)
      );

      // Access the isLocked property and userId from the response
      const { isLocked, userId } = response;

      // Get the current user's ID from the Redux state
      const currentUserID = getState().user.id;

      // Dispatch actions based on the lock status and user ID
      if (isLocked) {
        dispatch({ type: "LOCK_MAP" });
        if (currentUserID === userId) {
          dispatch({ type: "SET_CURRENT_USER_LOCKED_MAP" });
        } else {
          dispatch({ type: "SET_OTHER_USER_LOCKED_MAP", payload: userId });
        }
      } else {
        dispatch({ type: "UNLOCK_MAP" });
        dispatch({ type: "CLEAR_LOCKED_MAP_USER" });
      }
    } catch (error) {
      // Handle error if the request fails
      console.error("Error checking map lock status:", error);
    }
  };
};
