const INITIAL_STATE = {
    dataGroupTitlesAndIDs: [],
    activeGroups: [],
    activeDataGroups: []
}

let dataGroupTitlesAndIDs;
let activeGroups;
let activeDataGroups;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
            console.log(activeGroups)
            return {
                ...state,
                activeGroups
            }
        case 'STORE_ACTIVE_DATA_GROUPS':
            activeDataGroups = action.payload;
            return {
                ...state,
                activeDataGroups
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