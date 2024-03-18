import { io } from "socket.io-client";
import constants from "../constants";
import { getToken } from "../utils/Auth";

export const establishSocketConnection = () => {
  return (dispatch, getState) => {
    dispatch(closeSocketConnection());
    console.log("connecting websocket");
    const socket = io(constants.ROOT_URL, { auth: { token: getToken() } });
    const mapId = getState().mapMeta.currentMapId;
    dispatch({ type: "SOCKET_CONNECT", payload: socket });

    socket.on("connect", () => {
      console.log(`Websocket connected ${socket.id}`);
      socket.emit("currentMap", mapId);
    });

    // Add listener for mapLock event
    socket.on("mapLock", ({ mapId, userId }) => {
      const userInitials = getState().user.initials;
      console.log("mapLock", { mapId, userId, userInitials });
      if (mapId === getState().mapMeta.currentMapId) {
        if (userId === null || userId === getState().user.id) {
          dispatch({ type: "MAP_UNLOCKED" });
        } else {
          dispatch({ type: "MAP_LOCKED", payload: { userInitials } });
        }
      }
    });
  };
};

export const sendCurrentMap = () => {
  return (dispatch, getState) => {
    const { currentMapId } = getState().mapMeta.currentMapId;
    if (currentMapId !== null) {
      const socket = getState().socket.socketConnection;
      socket.emit("currentMap", currentMapId);
    }
  };
};

export const closeSocketConnection = () => {
  return (dispatch, getState) => {
    const socket = getState().socket.socketConnection;
    socket?.close();
    dispatch({ type: "SOCKET_DISCONNECT" });
  };
};
