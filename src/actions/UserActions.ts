import { AppDispatch } from "@/store";
import { getRequest, postRequest } from "./RequestActions";
import { UserGuideStatusData } from "@/types/user";
import { User } from "@/reducers/UserReducer";

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
    const response = await dispatch(
      getRequest<User>("/api/user/ask-for-feedback"),
    );
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

export const setUserGuidePromptSeen = (
  userGuideStatusData: UserGuideStatusData,
) => {
  return async (dispatch: AppDispatch) => {
    await dispatch(
      postRequest("/api/user/user-guide-prompt-seen", {
        userGuidePromptSeen: userGuideStatusData.userGuidePromptSeen,
        viewedUserGuide: userGuideStatusData.viewedUserGuide,
        viewedSource: userGuideStatusData.viewedSource,
      }),
    );
  };
};

export const getAnalyticsConsentStatus = () => {
  return async (dispatch: AppDispatch) => {
    const response = await dispatch(
      getRequest<User>("/api/user/analytics-consent"),
    );
    if (response) {
      dispatch({
        type: "USER_ANALYTICS_CONSENT_STATUS",
        payload: response.analyticsConsent,
      });
    }
  };
};

export const setAnalyticsConsent = (status: boolean) => {
  return async (dispatch: AppDispatch) => {
    const success = await dispatch(
      postRequest("/api/user/analytics-consent", { analyticsConsent: status }),
    );

    if (success) {
      dispatch({
        type: "USER_ANALYTICS_CONSENT_STATUS",
        payload: status,
      });
    }
  };
};

