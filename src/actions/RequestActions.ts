import axios from "axios";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import { RootState } from "@/store";
import { sessionTimedOut } from "./AuthenticationActions";

/**
 * Make a GET request to the given API endpoint.
 *
 * If we hit a 401 Unauthorized error, timeout the session so the user returns to login screen.
 *
 * @param {string} endpoint the API endpoint, starting '/api/'
 * @returns {Promise<any>} the resulting data, or null if the request failed
 */
export const getRequest = (endpoint: string) => {
  return async (dispatch: any, getState: () => RootState) => {
    try {
      const { sessionId } = getState().user;
      const response = await axios.get(`${constants.ROOT_URL}${endpoint}`, {
        headers: {
          ...getAuthHeader().headers,
          "x-session-id": sessionId,
        },
      });
      return response.data;
    } catch (err: any) {
      console.error(`There was an error in ${endpoint} GET request`, err);

      if (err.response?.status === 401) {
        await dispatch(sessionTimedOut());
      }
    }
    return null;
  };
};

/**
 * Make a POST request to the given API endpoint.
 *
 * If we hit a 401 Unauthorized error, timeout the session so the user returns to login screen.
 *
 * @param {string} endpoint the API endpoint, starting '/api/'
 * @param {any} body the data to include in the POST request
 * @returns {Promise<boolean>} whether the request was successful
 */
export const postRequest = (endpoint: string, body: any) => {
  return async (dispatch: any, getState: () => RootState) => {
    try {
      const { sessionId } = getState().user;
      await axios.post(`${constants.ROOT_URL}${endpoint}`, body, {
        headers: {
          ...getAuthHeader().headers,
          "x-session-id": sessionId,
        },
      });
      return true;
    } catch (err: any) {
      console.error(`There was an error in ${endpoint} POST request`, err);

      if (err.response?.status === 401) {
        await dispatch(sessionTimedOut());
      }
    }
    return false;
  };
};
