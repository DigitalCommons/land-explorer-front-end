import { optOutAndResetAnalyticsUser } from "@/analytics";

export const logOut = () => {
  return async (dispatch: any) => {
    optOutAndResetAnalyticsUser();
    dispatch({ type: "LOG_OUT" });
  };
};

export const sessionTimedOut = () => {
  return async (dispatch: any) => {
    optOutAndResetAnalyticsUser();
    dispatch({ type: "SESSION_TIMED_OUT" });
  };
};
