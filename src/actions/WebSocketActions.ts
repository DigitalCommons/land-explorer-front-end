import { io, Socket } from "socket.io-client";
import constants from "../constants";
import * as Auth from "../utils/Auth";
import { reloadCurrentMap } from "./MapActions";
import { updateReadOnly } from "./ReadOnlyActions";

const socket: Socket = io(constants.ROOT_URL as string, {
  auth: (cb) => {
    cb({ token: Auth.getToken() });
  },
  autoConnect: false,
});

export const establishSocketConnection = () => {
  return (dispatch: any, getState: any) => {
    socket.removeAllListeners(); // to avoid duplicate listeners

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
          dispatch(reloadCurrentMap());
        } else if (userId === getState().user.id) {
          // if user with the lock is this user, we can treat this as if the map is unlocked
          dispatch({ type: "MAP_UNLOCKED" });
        } else {
          dispatch({ type: "MAP_LOCKED", payload: { userInitials } });
          dispatch(updateReadOnly());
          dispatch(reloadCurrentMap());
        }
      }
    });

    console.log("connecting websocket");
    socket.connect();
  };
};

export const notifyServerOfCurrentMap = () => {
  return (_dispatch: any, getState: any) => {
    const { currentMapId } = getState().mapMeta;
    socket.emit("currentMap", currentMapId);
  };
};

export const closeSocketConnection = () => {
  return (_dispatch: any, _getState: any) => {
    socket.removeAllListeners();
    socket.disconnect();
  };
};
