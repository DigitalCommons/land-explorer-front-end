export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: "LOG_OUT" });
  };
};
