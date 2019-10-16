const INITIAL_STATE = {
    activeCommunityAssets: [],
}
let markerInformationSet = [];
let markerId = 1;

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ASSET_TYPE_ON':
            console.log("turning on " + action.payload.communityAssetsType);
            state.activeCommunityAssets.push("Community Space " + action.payload.name);
            console.log(state.activeCommunityAssets);
            return state;
        /*case 'ADD_MARKER':
            console.log("Adding " + action.payload.name + " marker at " + action.payload.location + " costing: " + action.payload.price);
            markerInformationSet.push(action.payload);
            state.markerInformationSet = markerInformationSet;
            console.log(markerInformationSet);
            return state;
        case 'CLEAR MARKERS':
            markerInformationSet = [];
            state.markerInformationSet = markerInformationSet;
            return state;*/
        default:
            return state;
    }
}