import { io } from "socket.io-client";
import constants from "../constants";
import * as Auth from "../utils/Auth";
import { refreshCurrentMap } from "./MapActions";
import { updateReadOnly } from "./ReadOnlyActions";

export const establishSocketConnection = () => {
  return (dispatch, getState) => {
    dispatch(closeSocketConnection());
    console.log("connecting websocket");
    const socket = io(constants.ROOT_URL, { auth: { token: Auth.getToken() } });
    dispatch({ type: "SOCKET_CONNECT", payload: socket });

    socket.on("connect", () => {
      console.log(`Websocket connected ${socket.id}`);
      const { currentMapId } = getState().mapMeta;
      socket.emit("currentMap", currentMapId);
    });

    // Add listener for mapLock event
    socket.on("mapLock", ({ mapId, userId, userInitials }) => {
      console.log("mapLock", { mapId, userId, userInitials });
      const { currentMapId } = getState().mapMeta;

      if (mapId === currentMapId) {
        if (userId === null) {
          dispatch({ type: "MAP_UNLOCKED" });
          dispatch(refreshCurrentMap());
        } else if (userId === getState().user.id) {
          // if user with the lock is this user, we can treat this as if the map is unlocked
          dispatch({ type: "MAP_UNLOCKED" });
        } else {
          dispatch({ type: "MAP_LOCKED", payload: { userInitials } });
          dispatch(updateReadOnly());
          dispatch(refreshCurrentMap());
        }
      }
    });
  };
};

export const notifyServerOfCurrentMap = () => {
  return (dispatch, getState) => {
    const { currentMapId } = getState().mapMeta;
    const socket = getState().webSocket.socketConnection;
    socket.emit("currentMap", currentMapId);
  };
};

export const closeSocketConnection = () => {
  return (dispatch, getState) => {
    const socket = getState().webSocket.socketConnection;
    socket?.close();
    dispatch({ type: "SOCKET_DISCONNECT" });
  };
};
