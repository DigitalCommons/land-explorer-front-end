const INITIAL_STATE = {
    markerInformationSet: [],
}
let markerInformationSet = [];
let markerId;

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ADD_MARKER':
            console.log("Adding " + action.payload.name + " marker at " + action.payload.location + " costing: " + action.payload.price);
            markerInformationSet.push(action.payload);
            state.markerInformationSet = markerInformationSet;
            console.log(markerInformationSet);
            return state;
        case 'CLEAR MARKERS':
            markerInformationSet = [];
            state.markerInformationSet = markerInformationSet;
            return state;
        default:
            return state;
    }
}