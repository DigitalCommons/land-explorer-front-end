const INITIAL_STATE = {
  propertyCoordinates: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_PROPERTY_POLYGON":
      return {
        ...state,
        propertyCoordinates: action.payload,
      };
    default:
      return state;
  }
};
