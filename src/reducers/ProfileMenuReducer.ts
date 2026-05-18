import { Action } from "../types";

type ProfileMenuState = {
  open: boolean;
};

const INITIAL_STATE: ProfileMenuState = {
  open: false,
};

export default (
  state: ProfileMenuState = INITIAL_STATE,
  action: Action
): ProfileMenuState => {
  switch (action.type) {
    case "TOGGLE_PROFILE_MENU":
      return {
        open: !state.open,
      };
    case "OPEN_PROFILE_MENU":
      return {
        open: true,
      };
    case "CLOSE_MENUS":
    case "CLOSE_PROFILE_MENU":
      return {
        open: false,
      };
    default:
      return state;
  }
};
