const INITIAL_STATE = {
  userGroupTitlesAndIDs: [],
  activeGroups: [],
  dataGroupsData: [],
};

let activeGroups;
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_GROUP_TITLES":
      return {
        ...state,
        userGroupTitlesAndIDs: action.payload,
      };
    case "TOGGLE_DATA_GROUP":
      if (state.activeGroups.includes(action.payload)) {
        activeGroups = state.activeGroups.filter(
          (groupId) => groupId != action.payload
        );
      } else {
        activeGroups = state.activeGroups.concat([action.payload]);
      }
      return {
        ...state,
        activeGroups,
      };
    case "STORE_DATA_GROUPS_DATA":
      return {
        ...state,
        dataGroupsData: action.payload,
      };
    case "LOAD_MAP":
      const { myDataLayers } = action.payload.data.mapLayers;
      // Old version contains array of objects, but now just contains array of data group IDs
      activeGroups = myDataLayers.map(
        (myDataLayer) => myDataLayer.iddata_groups || myDataLayer
      );
      return {
        ...state,
        activeGroups,
      };
    case "NEW_MAP":
      return {
        ...state,
        activeGroups: [],
      };
    default:
      return state;
  }
};
