import { optOutAndResetAnalyticsUser } from "@/analytics";

export const logOut = () => {
  return async (dispatch: any) => {
    optOutAndResetAnalyticsUser();
    dispatch({ type: "LOG_OUT" });
  };
};
