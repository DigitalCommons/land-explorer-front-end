import { io } from "socket.io-client";
import constants from "../constants";
import { getToken } from "../utils/Auth";

export const establishSocketConnection = () => {
  return (dispatch, getState) => {
    dispatch(closeSocketConnection());
    console.log("connecting websocket");
    const socket = io(constants.ROOT_URL, { auth: { token: getToken() } });
    dispatch({ type: "SOCKET_CONNECT", payload: socket });

    socket.on("connect", () => {
      console.log(`Websocket connected ${socket.id}`);
      socket.emit("currentMap", getState().mapMeta.currentMapId);
    });
  };
};

export const sendCurrentMap = () => {
  return (dispatch, getState) => {
    const { currentMapId } = getState().mapMeta;
    if (currentMapId !== null) {
      const socket = getState().socket.socketConnection;
      socket.emit("currentMap", currentMapId);
    }
  };
};

const closeSocketConnection = () => {
  return (dispatch, getState) => {
    const socket = getState().socket.socketConnection;
    socket?.close();
    dispatch({ type: "SOCKET_DISCONNECT" });
  };
};
