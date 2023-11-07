import axios from 'axios';
import constants from "../constants";
import { getAuthHeader } from '../utils/Auth';

/**
 * Make a GET request to the given API endpoint.
 * 
 * If we hit a 401 Unauthorized error, timeout the session so the user returns to login screen.
 * 
 * @param {string} endpoint the API endpoint, starting '/api/'
 * @returns {Promise<any>} the resulting data, or null if the request failed
 */
export const getRequest = endpoint => {
    return async dispatch => {
        try {
            const response = await axios.get(`${constants.ROOT_URL}${endpoint}`, getAuthHeader());
            return response.data;
        } catch (err) {
            console.error(`There was an error in ${endpoint} GET request`, err);

            if (err.response?.status === 401) {
                dispatch({ type: 'SESSION_TIMED_OUT' });
            }
        }
        return null;
    }
}

/**
 * Make a POST request to the given API endpoint.
 * 
 * If we hit a 401 Unauthorized error, timeout the session so the user returns to login screen.
 * 
 * @param {string} endpoint the API endpoint, starting '/api/'
 * @param {any} body the data to include in the POST request
 * @returns {Promise<boolean>} whether the request was successful
 */
export const postRequest = (endpoint, body) => {
    return async dispatch => {
        try {
            await axios.post(`${constants.ROOT_URL}${endpoint}`, body, getAuthHeader());
            return true;
        } catch (err) {
            console.error(`There was an error in ${endpoint} POST request`, err);

            if (err.response?.status === 401) {
                dispatch({ type: 'SESSION_TIMED_OUT' });
            }
        }
        return false;
    }
}
