const INITIAL_STATE = {
  propertyInformation: {},
  displayActive: false,
  highlightedProperty: null,
};

let propertyInformation;
let highlightedProperty;

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
      state.highlightedProperty = highlightedProperty;
      return {
        ...state,
        highlightedProperty: highlightedProperty
      };
    case "CLEAR_HIGHLIGHT":
      state.highlightedProperty = null;
      return {...state};
    default:
      return state;
  }
};
