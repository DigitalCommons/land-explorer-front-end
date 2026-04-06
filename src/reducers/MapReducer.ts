import { LngLat, Action } from "../types";

// TODO: this should probably be merged into MapMetaReducer since the distinction doesn't make a lot
// of sense

type MapState = {
  zoom: [number];
  zooming: boolean;
  lngLat: [number, number];
  searchMarker: LngLat | null;
  currentLocation: LngLat | null;
  movingMethod: "flyTo" | "jumpTo";
  name: string | null;
};

const INITIAL_STATE: MapState = {
  zoom: [6],
  zooming: false,
  lngLat: [-1.5, 53],
  searchMarker: null,
  currentLocation: null,
  movingMethod: "flyTo",
  name: null,
};

type SaveMapPayload = {
  map: MapState;
};

type LoadMapPayload = {
  name: string;
  data: {
    map: MapState;
  };
};

export default (state: MapState = INITIAL_STATE, action: Action): MapState => {
  switch (action.type) {
    case "ZOOM_IN":
      if (state.zoom[0] < 20) {
        return {
          ...state,
          zoom: [Math.floor(state.zoom[0] + 1)],
        };
      } else {
        return {
          ...state,
        };
      }
    case "ZOOM_OUT":
      if (state.zoom[0] > 6.5) {
        return {
          ...state,
          zoom: [Math.ceil(state.zoom[0] - 1)],
        };
      } else {
        return {
          ...state,
        };
      }
    case "SET_ZOOM":
      return {
        ...state,
        zoom: action.payload as [number],
      };
    case "SET_ZOOMING":
      return {
        ...state,
        zooming: action.payload as boolean,
      };
    case "SET_LNG_LAT":
      return {
        ...state,
        lngLat: action.payload as [number, number],
      };
    case "SET_CURRENT_LOCATION":
      return {
        ...state,
        currentLocation: action.payload as LngLat | null,
      };
    case "SET_SEARCH_MARKER":
      return {
        ...state,
        searchMarker: action.payload as LngLat | null,
      };
    case "CLEAR_SEARCH_MARKER":
      return {
        ...state,
        searchMarker: null,
      };
    case "CHANGE_MOVING_METHOD":
      return {
        ...state,
        movingMethod: action.payload as "flyTo" | "jumpTo",
      };
    case "SAVE_MAP":
      return (action.payload as SaveMapPayload).map;
    case "LOAD_MAP": {
      const loadPayload = action.payload as LoadMapPayload;
      return {
        ...loadPayload.data.map,
        name: loadPayload.name,
        movingMethod: "jumpTo",
      };
    }
    case "RELOAD_MAP": {
      const reloadPayload = action.payload as LoadMapPayload;
      return {
        ...state,
        name: reloadPayload.name,
      };
    }
    case "NEW_MAP":
      return {
        ...INITIAL_STATE,
        movingMethod: "jumpTo",
      };
    case "SET_MAP_NAME":
      return {
        ...state,
        name: action.payload as string,
      };
    default:
      return state;
  }
};
