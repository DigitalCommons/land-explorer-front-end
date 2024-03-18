import { isMobile } from "react-device-detect";
// import { checkMapLock } from "./MapActions";

/**
 * Set the read-only state. Read-only should be enabled if any of the following are true:
 * - we are offline
 * - the current map is a snapshot
 * - the user doesn't have write access for the current map
 * - we're on a mobile device
 * - the map is locked by another user
 */
export const updateReadOnly = () => {
  return (dispatch, getState) => {
    const { isSnapshot, writeAccess } = getState().mapMeta;
    const isOnline = getState().connectivity.isOnline;
    const mapId = getState().mapMeta.currentMapId;

    // // #306 Enable multiple users to write to a map
    // // M.S. Dispatch the checkMapLock action to get the lock status
    // await dispatch(checkMapLock(mapId));

    // #306 Enable multiple users to write to a map
    const isLockedByOtherUser = getState().mapMeta.lockUserInitials !== null;

    console.log("UpdateReadOnly isLocked:", isLockedByOtherUser);

    // Update the read-only state based on the conditions
    if (
      !isOnline ||
      isSnapshot ||
      !writeAccess ||
      isMobile ||
      isLockedByOtherUser
    ) {
      dispatch({ type: "READ_ONLY_ON" });
    } else {
      dispatch({ type: "READ_ONLY_OFF" });
    }
  };
};
