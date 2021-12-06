const INITIAL_STATE = {
  propertyInformation: {},
  displayActive: false,
  highlightMultiple: false,
  highlightedProperty: [],
};

let propertyInformation;
let highlightedProperty;
let propertyToRemove;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "VIEW_ADDRESS_INFO":
      propertyInformation = action.payload.propertyInformation;
      state.propertyInformation = propertyInformation;
      return {
        ...state,
        propertyInformation: propertyInformation,
      };
    case "DISPLAY_PROPERTIES":
      state.displayActive = true;
      return { ...state };
    case "STOP_DISPLAYING_PROPERTIES":
      state.displayActive = false;
      return { ...state };
    case "HIGHLIGHT_PROPERTY":
      highlightedProperty = action.payload.highlightedProperty;
      if (state.highlightMultiple)
        state.highlightedProperty = state.highlightedProperty.concat([highlightedProperty]);
      else
        state.highlightedProperty = [highlightedProperty];
      console.log("reducer");
      console.log(state.highlightedProperty);
      return {
        ...state,
        highlightedProperty: state.highlightedProperty
      };
    case "CLEAR_HIGHLIGHT":
      propertyToRemove = action.payload.property;
      console.log(propertyToRemove);
      console.log(state.highlightedProperty)
      state.highlightedProperty = state.highlightedProperty.filter(
        property => property.poly_id != propertyToRemove.line_1
      );
      return { ...state };
    case "CLEAR_ALL_HIGHLIGHT":
      state.highlightedProperty = [];
      return { ...state };
    case "TOGGLE_HIGHLIGHT_MULTIPLE":
      state.highlightMultiple = !state.highlightMultiple;
      return { ...state };
    default:
      return state;
  }
};
