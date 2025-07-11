const INITIAL_STATE = {
  id: "",
  initials: "",
  pic: "",
  firstName: "",
  lastName: "",
  address: "",
  address1: "",
  address2: "",
  city: "",
  postcode: "",
  marketing: "",
  organisation: "",
  organisationNumber: "",
  organisationType: "",
  organisationActivity: "",
  password: "",
  phone: "",
  username: "",
  populated: false,
  privileged: false,
  askForFeedback: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "POPULATE_USER":
      return {
        ...state,
        ...action.payload,
        populated: true,
        privileged: !!action.payload.is_super_user,
        initials:
          action.payload.firstName[0].toUpperCase() +
          action.payload.lastName[0].toUpperCase(),
      };
    case "SET_ASK_FOR_FEEDBACK":
      return {
        ...state,
        askForFeedback: action.payload,
      };
    default:
      return state;
  }
};
