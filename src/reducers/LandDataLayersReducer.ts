import { Action } from "../types";

type LandDataLayersState = {
  landDataLayers: string[];
};

const INITIAL_STATE: LandDataLayersState = {
  landDataLayers: [],
};

type LoadMapPayload = {
  data: {
    mapLayers: {
      landDataLayers: string[];
    };
  };
};

type LandDataLayersAction =
  | (Action<string> & { type: "TOGGLE_LAND_DATA_LAYER" })
  | (Action<LoadMapPayload> & { type: "LOAD_MAP" | "RELOAD_MAP" })
  | (Action & { type: "NEW_MAP" })
  | Action;

export default (
  state: LandDataLayersState = INITIAL_STATE,
  action: LandDataLayersAction
): LandDataLayersState => {
  let landDataLayers: string[];
  switch (action.type) {
    case "TOGGLE_LAND_DATA_LAYER": {
      const layerId = action.payload as string;
      landDataLayers = state.landDataLayers.slice();
      if (landDataLayers.includes(layerId)) {
        landDataLayers = landDataLayers.filter((e) => e !== layerId);
      } else {
        landDataLayers.push(layerId);
      }
      return {
        ...state,
        landDataLayers,
      };
    }
    case "LOAD_MAP":
    case "RELOAD_MAP":
      return {
        landDataLayers: (action.payload as LoadMapPayload).data.mapLayers
          .landDataLayers,
      };
    case "NEW_MAP":
      return INITIAL_STATE;
    default:
      return state;
  }
};
