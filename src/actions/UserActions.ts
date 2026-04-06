import { getRequest, postRequest } from "./RequestActions";

export const getUserDetails = () => {
  return async (dispatch: any) => {
    const userData = await dispatch(getRequest("/api/user/details"));
    if (userData) {
      dispatch({ type: "POPULATE_USER", payload: userData });
    }
  };
};

export const getAskForFeedback = () => {
  return async (dispatch: any) => {
    const response = await dispatch(getRequest("/api/user/ask-for-feedback"));
    // Always extract the boolean not the object
    if (response && typeof response.askForFeedback === "boolean") {
      dispatch({
        type: "USER_FEEDBACK_STATUS",
        payload: response.askForFeedback,
      });
    }
  };
};

export const setAskForFeedback = (status: boolean) => {
  return async (dispatch: any) => {
    const success = await dispatch(
      postRequest("/api/user/ask-for-feedback", { askForFeedback: status })
    );

    if (success) {
      dispatch({
        type: "USER_FEEDBACK_STATUS",
        payload: status,
      });
    }
  };
};
