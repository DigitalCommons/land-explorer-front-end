import { Action } from "../types";

type ModalConfig = {
  open: boolean;
  canToggle: boolean;
};

type ModalState = {
  saveCopy: ModalConfig;
  saveSnapshot: ModalConfig;
  emailShare: ModalConfig;
  download: ModalConfig;
  link: ModalConfig;
  location: ModalConfig;
  newMap: ModalConfig;
  openMap: ModalConfig;
  feedbackForm: ModalConfig;
  feedbackPopUp: ModalConfig;
  feedbackSuccess: ModalConfig;
  [key: string]: ModalConfig;
};

const INITIAL_STATE: ModalState = {
  saveCopy: {
    open: false,
    canToggle: true,
  },
  saveSnapshot: {
    open: false,
    canToggle: true,
  },
  emailShare: {
    open: false,
    canToggle: true,
  },
  download: {
    open: false,
    canToggle: true,
  },
  link: {
    open: false,
    canToggle: true,
  },
  location: {
    open: false,
    canToggle: false,
  },
  newMap: {
    open: false,
    canToggle: true,
  },
  openMap: {
    open: false,
    canToggle: true,
  },
  feedbackForm: {
    open: false,
    canToggle: true,
  },
  feedbackPopUp: {
    open: false,
    canToggle: true,
  },
  feedbackSuccess: {
    open: false,
    canToggle: true,
  },
};

type ModalAction =
  | Action<string> & { type: "TOGGLE_MODAL" | "CLOSE_MODAL" | "OPEN_MODAL" }
  | Action;

export default (state: ModalState = INITIAL_STATE, action: ModalAction): ModalState => {
  switch (action.type) {
    case "TOGGLE_MODAL": {
      const modalKey = action.payload as string;
      return {
        ...state,
        [modalKey]: {
          ...state[modalKey],
          open: !state[modalKey].open,
        },
      };
    }
    case "CLOSE_MODAL": {
      const modalKey = action.payload as string;
      return {
        ...state,
        [modalKey]: {
          ...state[modalKey],
          open: false,
        },
      };
    }
    case "OPEN_MODAL": {
      const modalKey = action.payload as string;
      return {
        ...state,
        [modalKey]: {
          ...state[modalKey],
          open: true,
        },
      };
    }
    default:
      return state;
  }
};
