import { io } from "socket.io-client";
import { getAuthHeader } from "../utils/Auth";

export const establishSocketConnection = (url, options) => {
  return (dispatch) => {
    // const socket = io(url, { ...options, auth: getAuthHeader() });
    const socket = io(url, options, { auth: getAuthHeader() });
    dispatch({ type: "SOCKET_CONNECT", payload: socket });
  };
};

export const closeSocketConnection = () => {
  return (dispatch, getState) => {
    const socket = getState().socket.socketConnection;
    socket.close();
    dispatch({ type: "SOCKET_DISCONNECT" });
  };
};
