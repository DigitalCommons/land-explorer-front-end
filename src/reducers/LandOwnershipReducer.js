const INITIAL_STATE = {
  address: "",
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
    default:
      return state;
  }
};
