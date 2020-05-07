const INITIAL_STATE = {
  markerInformationSet: [],
  currentView: {}
};
let markerInformationSet = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_MARKER":
      console.log(
        "Adding " +
          action.payload.name +
          " marker at " +
          action.payload.location +
          " costing: " +
          action.payload.price
      );
      markerInformationSet.push(action.payload);
      state.markerInformationSet = markerInformationSet;
      return state;
    case "CLEAR MARKERS":
      console.log("clearing markers");
      markerInformationSet = [];
      state.markerInformationSet = markerInformationSet;
      return state;
    case "POST_CURRENT_VIEW":
      state.currentView = action.payload;
      return state;
    default:
      return state;
  }
};
