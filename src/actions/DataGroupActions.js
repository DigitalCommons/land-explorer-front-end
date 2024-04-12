import { getRequest, postRequest } from "./RequestActions";
import { autoSave } from "./MapActions";

export const loadDataGroups = () => {
  return async (dispatch) => {
    const userGroupsData = await dispatch(getRequest("/api/user/datagroups"));
    if (userGroupsData === null) {
      return;
    }

    const mergedDataGroups = [];
    userGroupsData.forEach((userGroup) => {
      userGroup.dataGroups.forEach((dataGroup) => {
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
};

export const toggleDataGroup = (dataGroupId) => {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_DATA_GROUP",
      payload: dataGroupId,
    });
    return dispatch(autoSave());
  };
};

/** Save the object data to a specified data group. Return false iff failed to save to backend. */
export const saveObjectToDataGroup = (type, data, dataGroupId) => {
  return async (dispatch) => {
    const body = {
      object: data,
      dataGroupId,
    };

    const success = await dispatch(
      postRequest(`/api/user/datagroup/save/${type}`, body)
    );
    if (success) {
      // reload data groups with the new object
      dispatch(loadDataGroups());
      return true;
    }
    return false;
  };
};

/** Edit the specified object's name and description. Return false iff failed to save to backend. */
export const editDataGroupObjectInfo = (
  type,
  dataGroupId,
  uuid,
  newName,
  newDescription
) => {
  return async (dispatch) => {
    const body = {
      dataGroupId,
      uuid,
      name: newName,
      description: newDescription,
    };

    const success = await dispatch(
      postRequest(`/api/user/datagroup/edit/${type}`, body)
    );
    if (success) {
      dispatch(loadDataGroups());
      return true;
    }
    return false;
  };
};
