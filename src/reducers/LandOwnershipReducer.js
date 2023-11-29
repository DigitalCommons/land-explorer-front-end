const INITIAL_STATE = {
  displayActive: false,
  highlightedProperties: [],
  activePropertyId: null
};

let propertyToAdd;
let highlightedProperties;
let propertyToRemove;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_PROPERTY_DISPLAY":
      return {
        ...state,
        displayActive: !state.displayActive
      };
    case "HIGHLIGHT_PROPERTY":
      propertyToAdd = action.payload;
      if (!state.highlightedProperties.some(p => p.poly_id === propertyToAdd.poly_id)) {
        highlightedProperties = state.highlightedProperties.concat([propertyToAdd]);
      }
      return {
        ...state,
        highlightedProperties
      };
    case "CLEAR_HIGHLIGHT":
      propertyToRemove = action.payload;
      highlightedProperties = state.highlightedProperties.filter(
        property => property.poly_id !== propertyToRemove.poly_id
      );
      return {
        ...state,
        highlightedProperties,
        activePropertyId: null
      };
    case "CLEAR_ALL_HIGHLIGHTED_PROPERTIES":
      return {
        ...state,
        highlightedProperties: [],
        activePropertyId: null
      }
    case "SET_ACTIVE_PROPERTY":
      return {
        ...state,
        activePropertyId: action.payload
      };
    case "CLEAR_ACTIVE_PROPERTY":
      return {
        ...state,
        activePropertyId: null
      };
    default:
      return state;
  }
};
