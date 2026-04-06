export const logOut = () => {
  return async (dispatch: any) => {
    dispatch({ type: "LOG_OUT" });
  };
};
