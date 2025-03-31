import { getRequest } from './RequestActions';
import * as analytics from "../analytics";

export const getUserDetails = () => {
  return async (dispatch) => {
    const userData = await dispatch(getRequest("/api/user/details"));
    if (userData) {
      dispatch({ type: "POPULATE_USER", payload: userData });
      analytics.setUser(userData.id, userData.username);
    }
  };
};
