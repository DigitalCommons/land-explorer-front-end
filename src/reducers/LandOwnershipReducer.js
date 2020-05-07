const INITIAL_STATE = {
  address: "",
  displayActive: false,
};

let address;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "VIEW_ADDRESS_INFO":
      address = action.payload.address;
      state.address = address;
      return {
        ...state,
        address: address,
      };
    case "DISPLAY_PROPERTIES":
      state.displayActive = true;
      return { ...state };
    case "STOP_DISPLAYING_PROPERTIES":
      state.displayActive = false;
      return { ...state };
    default:
      return state;
  }
};
