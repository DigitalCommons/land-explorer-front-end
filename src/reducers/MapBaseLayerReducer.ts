import { Action } from "../types";

type MapBaseLayerState = {
  layer: "topography" | "aerial";
};

const INITIAL_STATE: MapBaseLayerState = {
  layer: "topography",
};

export default (
  state: MapBaseLayerState = INITIAL_STATE,
  action: Action
): MapBaseLayerState => {
  switch (action.type) {
    case "MAP_LAYER_AERIAL":
      return {
        ...state,
        layer: "aerial",
      };
    case "MAP_LAYER_TOPOGRAPHY":
      return {
        ...state,
        layer: "topography",
      };
    case "NEW_MAP":
      return INITIAL_STATE;
    default:
      return state;
  }
};
