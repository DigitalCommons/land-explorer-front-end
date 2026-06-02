import { AppDispatch } from "@/store";
import { getRequest, postRequest } from "./RequestActions";
import { UserGuideStatusData } from "@/types/user";
import { User } from "@/reducers/UserReducer";
import {
  optOutAndResetAnalyticsUser,
  optInAndSetAnalyticsUser,
} from "@/analytics";

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
   const success = await dispatch(
     postRequest("/api/user/user-guide-prompt-seen", {
       userGuidePromptSeen: userGuideStatusData.userGuidePromptSeen,
       viewedUserGuide: userGuideStatusData.viewedUserGuide,
       viewedSource: userGuideStatusData.viewedSource,
     }),
   );
   if (success) {
     dispatch({
       type: "USER_GUIDE_PROMPT_SEEN",
       payload: userGuideStatusData,
     });
   }
  };
};

export const setAnalyticsConsent = (
  status: boolean,
  userId: string,
  username: string,
) => {
  return async (dispatch: AppDispatch) => {
    const success = await dispatch(
      postRequest("/api/user/analytics-consent", { analyticsConsent: status }),
    );

    if (success) {
      await dispatch({
        type: "USER_ANALYTICS_CONSENT_STATUS",
        payload: status,
      });

      if (status === true) {
        await optInAndSetAnalyticsUser(userId, username);
      } else {
        await optOutAndResetAnalyticsUser();
      }
    }
  };
};

