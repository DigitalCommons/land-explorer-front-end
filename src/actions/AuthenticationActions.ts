import { resetAnalyticsUser } from "@/analytics";

export const logOut = () => {
  return async (dispatch: any) => {
    resetAnalyticsUser();
    dispatch({ type: "LOG_OUT" });
  };
};
