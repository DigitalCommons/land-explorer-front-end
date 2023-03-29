import axios from 'axios';
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import { autoSave } from './MapActions';

export const loadDataGroups = () => {
    return async dispatch => {
        const result = await axios.get(`${constants.ROOT_URL}/api/user/datagroups`, getAuthHeader());

        const userGroupsData = result.data;

        const mergedDataGroups = [];

        userGroupsData.forEach(userGroup => {
            userGroup.dataGroups.forEach(dataGroup => {
                dataGroup.userGroupId = userGroup.id;
                mergedDataGroups.push(dataGroup);
            });
        });
        dispatch({
            type: "STORE_DATA_GROUPS_DATA",
            payload: mergedDataGroups,
        });

        const userGroupTitlesAndIDs = userGroupsData.map((userGroup) => ({
            title: userGroup.name,
            id: userGroup.id,
        }));
        dispatch({
            type: "SET_USER_GROUP_TITLES",
            payload: userGroupTitlesAndIDs,
        });

        const dataGroupTitlesAndIDs = mergedDataGroups.map((dataGroup) => ({
            title: dataGroup.title,
            id: dataGroup.iddata_groups,
            userGroupId: dataGroup.userGroupId,
        }));
        return dispatch({
            type: "SET_DATA_GROUP_TITLES",
            payload: dataGroupTitlesAndIDs,
        });
    };
}

export const toggleDataGroup = dataGroupId => {
    return dispatch => {
        console.log('Toggle data group', dataGroupId);
        dispatch({
            type: "TOGGLE_DATA_GROUP",
            payload: dataGroupId,
        });
        return dispatch(autoSave());
    };
}

/** Save the object data to a specified data group. Return false iff failed to save to backend. */
export const saveObjectToDataGroup = (type, data, dataGroupId) => {
    return async dispatch => {
        const body = {
            object: data,
            dataGroupId: dataGroupId,
        };

        const success = await postRequest(`/api/user/datagroup/save/${type}`, body);
        if (success) {
            // reload data groups with the new object
            dispatch(loadDataGroups());
            return true;
        }
        return false;
    }
}

/** Edit the specified object's name and description. Return false iff failed to save to backend. */
export const editDataGroupObjectInfo = (type, uuid, newName, newDescription) => {
    return async dispatch => {
        const body = {
            uuid,
            name: newName,
            description: newDescription,
        };

        const success = await postRequest(`/api/user/edit/${type}`, body);
        if (success) {
            dispatch(loadDataGroups());
            return true;
        }
        return false;
    }
}

/**
 * Make a POST request to the given API endpoint.
 * 
 * @param {string} endpoint the API endpoint, starting '/api/'
 * @param {any} body the data to include in the POST request
 * @returns {Promise<boolean>} whether the save was successful
 */
const postRequest = async (endpoint, body) => {
    try {
        await axios.post(`${constants.ROOT_URL}${endpoint}`, body, getAuthHeader());
        return true;
    } catch (err) {
        console.error(`There was an error in ${endpoint} POST request`, err);
    }
    return false;
}
