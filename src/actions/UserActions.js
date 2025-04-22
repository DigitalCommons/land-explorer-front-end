import { getRequest } from './RequestActions';
import { setUser } from "../analytics";

export const getUserDetails = () => {
  return async (dispatch) => {
    const userData = await dispatch(getRequest("/api/user/details"));
    if (userData) {
      dispatch({ type: "POPULATE_USER", payload: userData });
      setUser(userData.id, userData.username);
    }
  };
};
