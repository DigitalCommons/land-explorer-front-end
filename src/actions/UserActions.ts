import { AppDispatch } from "@/store";
import { getRequest, postRequest } from "./RequestActions";

export const getUserDetails = () => {
  return async (dispatch: AppDispatch) => {
    const userData = await dispatch(getRequest("/api/user/details"));
    if (userData) {
      dispatch({ type: "POPULATE_USER", payload: userData });
    }
  };
};

export const getAskForFeedback = () => {
  return async (dispatch: AppDispatch) => {
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
  return async (dispatch: AppDispatch) => {
    const success = await dispatch(
      postRequest("/api/user/ask-for-feedback", { askForFeedback: status }),
    );

    if (success) {
      dispatch({
        type: "USER_FEEDBACK_STATUS",
        payload: status,
      });
    }
  };
};

export const getUserGuideStatus = () => {
  return async (dispatch: AppDispatch) => {
    //const response = await dispatch(getRequest("/api/user/user-guide-seen"));
    //if (response && typeof response.hasSeenUserGuide === "boolean") {
    // dispatch({
    //   type: "USER_GUIDE_STATUS",
    //   payload: response.hasSeenUserGuide,
    // });
    //}
    dispatch({
      type: "USER_GUIDE_STATUS",
      payload: false,
    });
  };;
};

export const setUserGuideSeen = () => {
  return async (dispatch: AppDispatch) => {
    const success = await dispatch(
      postRequest("/api/user/user-guide-seen", { hasSeenUserGuide: true }),
    );

    if (success) {
      dispatch({
        type: "USER_GUIDE_STATUS",
        payload: true,
      });
    }
  };
};
