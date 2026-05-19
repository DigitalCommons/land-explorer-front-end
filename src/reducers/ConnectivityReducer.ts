import { Action } from "../types";

type ConnectivityState = {
  isOnline: boolean;
};

const INITIAL_STATE: ConnectivityState = {
  isOnline: true,
};

export default (
  state: ConnectivityState = INITIAL_STATE,
  action: Action
): ConnectivityState => {
  switch (action.type) {
    case "ONLINE":
      return {
        isOnline: true,
      };
    case "OFFLINE":
      return {
        isOnline: false,
      };
    default:
      return state;
  }
};
