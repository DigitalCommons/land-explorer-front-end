import constants, { VERSION } from "../constants";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { getRequest, postRequest } from "./RequestActions";
import { updateReadOnly } from "./ReadOnlyActions";
import { notifyServerOfCurrentMap } from "./WebSocketActions";

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

/** Refresh the map that is currently open. */
export const refreshCurrentMap = () => {
  return async (dispatch, getState) => {
    const mapId = getState().mapMeta.currentMapId;

    if (mapId === null) {
      console.warn("No saved map to refresh");
      return;
    }

    console.log("Refreshing current map", mapId);

    // Get latest data from server
    await dispatch(getMyMaps());

    const map = getState().myMaps.maps.find((item) => item.map.eid === mapId);
    if (map) {
      const mapData = JSON.parse(map.map.data);
      const isSnapshot = map.map.isSnapshot;
      const lastModified = map.map.lastModified;
      const writeAccess = map.access !== constants.MAP_ACCESS_READ_ONLY;
      const ownMap = map.access === constants.MAP_ACCESS_OWNER;

      dispatch({
        type: "RELOAD_MAP",
        payload: {
          data: mapData,
          id: mapId,
          isSnapshot: isSnapshot,
          writeAccess: writeAccess,
          ownMap: ownMap,
          lastModified: shortenTimestamp(lastModified),
        },
      });
      dispatch(updateReadOnly());
    }
  };
};

/** Open specified map (if it exists in My Maps) */
export const openMap = (mapId) => {
  return async (dispatch, getState) => {
    const map = getState().myMaps.maps.find((item) => item.map.eid === mapId);
    if (map) {
      const mapData = JSON.parse(map.map.data);
      const isSnapshot = map.map.isSnapshot;
      const lastModified = map.map.lastModified;
      const writeAccess = map.access !== constants.MAP_ACCESS_READ_ONLY;
      const ownMap = map.access === constants.MAP_ACCESS_OWNER;

      dispatch({
        type: "LOAD_MAP",
        payload: {
          data: mapData,
          id: mapId,
          isSnapshot: isSnapshot,
          writeAccess: writeAccess,
          ownMap: ownMap,
          lastModified: shortenTimestamp(lastModified),
        },
      });
      console.log("map data:", mapData, "map id:", mapId);
      dispatch(updateReadOnly());

      /** #361 - Toggle ownership layers to ensure they appear in MenuKey */
      if (mapData.mapLayers?.ownershipDisplay) {
        const ownershipDisplay = mapData.mapLayers.ownershipDisplay;
        // Determine the layer ID based on the ownership display state
        const layerId = ownershipDisplay === true ? "all" : ownershipDisplay;
        console.log(
          `Ensuring ownership layer ${layerId} is in menu key after map load`
        );

        // Ensure the layer is in the key
        dispatch({
          type: "ENSURE_LAYER_IN_KEY",
          payload: layerId,
        });
      }

      setTimeout(() => {
        dispatch({
          type: "CHANGE_MOVING_METHOD",
          payload: "flyTo",
        });
      }, 1000);

      if (sessionStorage.getItem("currentMapId")) {
        sessionStorage.removeItem("currentMapId");
      }

      sessionStorage.setItem("currentMapId", mapId);

      dispatch(postRequest("/api/user/map/view", { eid: mapId }));
      dispatch(notifyServerOfCurrentMap());
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
    sessionStorage.removeItem("currentMapId");
    dispatch({
      type: "NEW_MAP",
      payload: { unsavedMapUuid: uuidv4() },
    });

    // Clear map layers directly in this action instead of dispatching a separate action
    dispatch({ type: "CLEAR_MAP_LAYERS" });

    setTimeout(() => {
      dispatch({ type: "CHANGE_MOVING_METHOD", payload: "flyTo" });
    }, 500);

    dispatch(updateReadOnly());
    dispatch(notifyServerOfCurrentMap());
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
        ownershipDisplay: getState().landOwnership.activeDisplay,
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

/**
 * Save the current map if it is saved, writable, and not locked by another user, otherwise do
 * nothing. Return false iff there is an error when saving.
 */
export const autoSave = () => {
  return async (dispatch, getState) => {
    const { currentMapId, writeAccess, lockedByOtherUserInitials } =
      getState().mapMeta;
    if (currentMapId && writeAccess && !lockedByOtherUserInitials) {
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
export const editMapObjectInfo = (type, eid, uuid, newName, newDescription) => {
  return async (dispatch, getState) => {
    const payload = {
      eid,
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
      return await dispatch(
        saveMapRequest(`/api/user/map/edit/${type}`, payload)
      );
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

    const { currentMapId, writeAccess } = getState().mapMeta;
    // If map is saved and we have write access, save to back-end
    if (currentMapId && writeAccess) {
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

const saveMapZoom = () => {
  return async (dispatch, getState) => {
    const { currentMapId, writeAccess } = getState().mapMeta;

    // If map is saved and we have write access, save to back-end
    if (currentMapId && writeAccess) {
      const body = {
        eid: currentMapId,
        zoom: getState().map.zoom,
      };
      await dispatch(saveMapRequest("/api/user/map/save/zoom", body));
    }
  };
};

export const zoomIn = () => {
  return (dispatch) => {
    dispatch({ type: "ZOOM_IN" });
    dispatch(saveMapZoom());
  };
};

export const zoomOut = () => {
  return (dispatch) => {
    dispatch({ type: "ZOOM_OUT" });
    dispatch(saveMapZoom());
  };
};

export const setZoom = (zoom) => {
  return (dispatch) => {
    dispatch({
      type: "SET_ZOOM",
      payload: zoom,
    });
    dispatch(saveMapZoom());
  };
};

export const setZooming = (zooming) => {
  return (dispatch) => {
    dispatch({ type: "SET_ZOOMING", payload: zooming });
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

/**
 * #361 - Toggle ownership layer in the key
 * Ensures only one ownership layer is active in the key at a time.
 */
export const toggleOwnershipLayerInKey = (layerId) => {
  return (dispatch, getState) => {
    const activeLayers = getState().mapLayers.landDataLayers;
    const ownershipLayers = [
      "all",
      "localAuthority",
      "churchOfEngland",
      "pending",
    ];

    // If the layer is already active, toggle it off
    if (activeLayers.includes(layerId)) {
      dispatch({
        type: "TOGGLE_LAYER",
        payload: layerId,
      });
    }
    // If the layer is not active, ensure only this one is active
    else {
      // Remove other ownership layers
      ownershipLayers.forEach((id) => {
        if (activeLayers.includes(id)) {
          dispatch({
            type: "TOGGLE_LAYER",
            payload: id,
          });
        }
      });

      // Add the new layer
      dispatch({
        type: "TOGGLE_LAYER",
        payload: layerId,
      });
    }
  };
};