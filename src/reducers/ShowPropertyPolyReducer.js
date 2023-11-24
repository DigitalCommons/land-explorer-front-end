const INITIAL_STATE = {
  propertyCoordinates: [],
  polyId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_PROPERTY_POLYGON":
      return {
        ...state,
        propertyCoordinates: action.payload,
        polyId: action.payload.poly_id,
      };
    default:
      return state;
  }
};
