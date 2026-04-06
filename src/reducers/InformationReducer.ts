import { Action } from "../types";

type InformationState = {
  siteArea: string;
  landOwnership: string;
  agriculturalProperties: string;
};

const INITIAL_STATE: InformationState = {
  siteArea: "",
  landOwnership: "",
  agriculturalProperties: "",
};

export default (
  state: InformationState = INITIAL_STATE,
  action: Action
): InformationState => {
  switch (action.type) {
    case "SET_INFO_SITE_AREA":
      return {
        ...state,
        siteArea: action.payload as string,
      };
    case "SET_INFO_AGRICULTURAL":
      return {
        ...state,
        agriculturalProperties: action.payload as string,
      };
    case "NEW_MAP":
    case "CLEAR_INFO":
      return INITIAL_STATE;
    default:
      return state;
  }
};
