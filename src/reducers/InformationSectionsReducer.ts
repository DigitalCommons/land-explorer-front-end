import { Action } from "../types";

type InformationSectionsState = {
  siteArea: boolean;
  landOwnership: boolean;
  agriculturalGrade: boolean;
  [key: string]: boolean;
};

const INITIAL_STATE: InformationSectionsState = {
  siteArea: false,
  landOwnership: false,
  agriculturalGrade: false,
};

export default (
  state: InformationSectionsState = INITIAL_STATE,
  action: Action
): InformationSectionsState => {
  switch (action.type) {
    case "TOGGLE_SECTION":
      return {
        ...state,
        [action.payload as string]: !state[action.payload as string],
      };
    case "OPEN_SECTION":
      return {
        ...state,
        [action.payload as string]: true,
      };
    case "CLOSE_SECTION":
      return {
        ...state,
        [action.payload as string]: false,
      };
    default:
      return state;
  }
};
