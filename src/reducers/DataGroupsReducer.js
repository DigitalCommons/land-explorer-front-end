const INITIAL_STATE = {
    userGroupTitlesAndIDs: [],
    dataGroupTitlesAndIDs: [],
    activeGroups: [],
    dataGroupsData: []
}

let userGroupTitlesAndIDs;
let dataGroupTitlesAndIDs;
let activeGroups;
let dataGroupsData;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER_GROUP_TITLES':
            userGroupTitlesAndIDs = action.payload;
            return {
                ...state,
                userGroupTitlesAndIDs
            };
        case 'SET_DATA_GROUP_TITLES':
            dataGroupTitlesAndIDs = action.payload;
            return {
                ...state,
                dataGroupTitlesAndIDs
            };
        case 'TOGGLE_DATA_GROUP':
            if (state.activeGroups.includes(action.payload)) {
                activeGroups = state.activeGroups.filter(groupId => groupId != action.payload)
            }
            else {
                activeGroups = state.activeGroups.concat([action.payload]);
            }
            console.log('Active groups', activeGroups);
            return {
                ...state,
                activeGroups
            }
        case 'STORE_DATA_GROUPS_DATA':
            dataGroupsData = action.payload;
            return {
                ...state,
                dataGroupsData
            }
        case 'LOAD_MAP':
            const { myDataLayers } = action.payload.mapLayers;
            activeGroups = myDataLayers.map(myDataLayer => myDataLayer.iddata_groups);
            return {
                ...state,
                activeGroups
            }
        default:
            return state;
    }
}
