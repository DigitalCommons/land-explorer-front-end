import { AppDispatch, RootState } from "@/store";
import { getRequest, postRequest } from "./RequestActions";
import {
  optInAndSetAnalyticsUser,
  optOutAndResetAnalyticsUser,
} from "@/analytics";

export const getUserDetails = () => {
  return async (dispatch: any) => {
    const userData = await dispatch(getRequest("/api/user/details"));
    if (userData) {
      dispatch({ type: "POPULATE_USER", payload: userData });
      if (userData.analyticsConsent === true) {
        try {
          await optInAndSetAnalyticsUser(userData.id, userData.username);
        } catch {
          // analytics failure should not prevent the app from loading
        }
      } else if (userData.analyticsConsent === false) {
        optOutAndResetAnalyticsUser();
      }
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

export const setAnalyticsConsent = (status: boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const success = await dispatch(
      postRequest("/api/user/analytics-consent", { analyticsConsent: status }),
    );

    if (success) {
      dispatch({
        type: "USER_ANALYTICS_CONSENT_STATUS",
        payload: status,
      });

      if (status) {
        const { id, username } = getState().user;
        try {
          await optInAndSetAnalyticsUser(id, username);
        } catch {
          // analytics failure should not prevent consent from being saved
        }
      } else {
        optOutAndResetAnalyticsUser();
      }
    }

    return success;
  };
};
