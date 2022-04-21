const INITIAL_STATE = {
    dataGroupTitles: [],
    activeGroups: [],
}

let dataGroupTitles;
let activeGroups;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_DATA_GROUP_TITLES':
            dataGroupTitles = action.payload;
            return {
                ...state,
                dataGroupTitles
            };
        case 'TOGGLE_DATA_GROUP':
            if (state.activeGroups.includes(action.payload)) {
                activeGroups = state.activeGroups.filter(groupIndex => groupIndex != action.payload)
            }
            else {
                activeGroups = state.activeGroups.concat([action.payload]);
            }
            return {
                ...state,
                activeGroups
            }
        default:
            return state;
    }
}