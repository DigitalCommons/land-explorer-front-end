import { Action } from "../types";

type LeftPaneState = {
  open: boolean;
  active: string;
  activeTool: string;
};

const INITIAL_STATE: LeftPaneState = {
  open: true,
  active: "",
  activeTool: "",
};

export default (
  state: LeftPaneState = INITIAL_STATE,
  action: Action
): LeftPaneState => {
  switch (action.type) {
    case "TOGGLE_LEFT_PANE":
      return {
        ...state,
        open: !state.open,
      };
    case "OPEN_LEFT_PANE":
      return {
        ...state,
        open: true,
      };
    case "CLOSE_LEFT_PANE":
      return {
        ...state,
        open: false,
        active: "",
      };
    case "SET_ACTIVE":
      return {
        ...state,
        active: action.payload as string,
        activeTool:
          state.active === "Drawing Tools" ? state.activeTool : "",
      };
    case "SET_ACTIVE_TOOL":
      return {
        ...state,
        activeTool: action.payload as string,
      };
    case "DESELECT_TOOLS":
      return {
        ...state,
        activeTool: "",
      };
    case "TOGGLE_TOOL":
      return {
        ...state,
        activeTool:
          action.payload === state.activeTool ? "" : (action.payload as string),
      };
    case "ADD_POLYGON":
    case "SET_MARKER":
    case "CLOSE_TRAY":
      return {
        ...state,
        active: "",
        activeTool: "",
      };
    case "LOAD_MAP":
    case "NEW_MAP":
      return INITIAL_STATE;
    default:
      return state;
  }
};
