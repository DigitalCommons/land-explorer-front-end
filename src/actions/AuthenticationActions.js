import { closeSocketConnection } from "./WebSocketActions";

export const logOut = () => {
  return async (dispatch) => {
    dispatch(closeSocketConnection());
    dispatch({ type: "LOG_OUT" });
  };
};
