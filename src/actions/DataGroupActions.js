import axios from 'axios';
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";

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
        dispatch({
            type: "SET_DATA_GROUP_TITLES",
            payload: dataGroupTitlesAndIDs,
        });
    };
}

export const toggleDataGroup = dataGroupId => {
    return dispatch => {
        dispatch({
            type: "TOGGLE_DATA_GROUP",
            payload: dataGroupId,
        });
    };
}
