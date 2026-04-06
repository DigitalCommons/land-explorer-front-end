import { Action } from "../types";

type User = {
  id: string;
  initials: string;
  pic: string;
  firstName: string;
  lastName: string;
  address: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  marketing: string;
  organisation: string;
  organisationNumber: string;
  organisationType: string;
  organisationTypeOther: string;
  organisationActivity: string;
  password: string;
  phone: string;
  username: string;
  populated: boolean;
  privileged: boolean;
  askForFeedback: boolean;
};

type UserPayload = {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  address1?: string;
  address2?: string;
  city?: string;
  postcode?: string;
  marketing?: string;
  organisation?: string;
  organisationNumber?: string;
  organisationType?: string;
  organisationActivity?: string;
  phone?: string;
  username?: string;
  pic?: string;
  is_super_user?: boolean;
};

const INITIAL_STATE: User = {
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
  organisationTypeOther: "",
  organisationActivity: "",
  password: "",
  phone: "",
  username: "",
  populated: false,
  privileged: false,
  askForFeedback: true,
};

type UserAction =
  | Action<UserPayload> & { type: "POPULATE_USER" }
  | Action<boolean> & { type: "USER_FEEDBACK_STATUS" }
  | Action;

export default (state: User = INITIAL_STATE, action: UserAction): User => {
  switch (action.type) {
    case "POPULATE_USER": {
      const payload = action.payload as UserPayload;
      return {
        ...state,
        ...payload,
        populated: true,
        privileged: !!payload.is_super_user,
        initials:
          payload.firstName[0].toUpperCase() +
          payload.lastName[0].toUpperCase(),
      };
    }
    case "USER_FEEDBACK_STATUS":
      return {
        ...state,
        askForFeedback: action.payload as boolean,
      };
    default:
      return state;
  }
};
