import { LngLat, Action } from "../types";

type Marker = {
  uuid: string;
  coordinates: LngLat;
  name: string;
  description: string;
};

type MarkersState = {
  currentMarker: string | null;
  markersDrawn: number;
  markers: Marker[];
};

const INITIAL_STATE: MarkersState = {
  currentMarker: null,
  markersDrawn: 0,
  markers: [],
};

type SetMarkerPayload = {
  uuid: string;
  coordinates: LngLat;
};

type RenameMarkerPayload = {
  uuid: string;
  name: string;
  description: string;
};

type LoadMapPayload = {
  data: {
    markers: Partial<MarkersState>;
  };
};

type MarkersAction =
  | (Action<SetMarkerPayload> & { type: "SET_MARKER" })
  | (Action<string> & { type: "CLEAR_MARKER" | "SET_CURRENT_MARKER" })
  | (Action<RenameMarkerPayload> & { type: "RENAME_MARKER" })
  | (Action & {
      type: "SET_ACTIVE_POLYGON" | "CLEAR_CURRENT_MARKER" | "NEW_MAP";
    })
  | (Action<LoadMapPayload> & { type: "LOAD_MAP" | "RELOAD_MAP" })
  | Action;

export default (
  state: MarkersState = INITIAL_STATE,
  action: MarkersAction
): MarkersState => {
  let markers: Marker[];
  let currentMarker: string | null;
  switch (action.type) {
    case "SET_MARKER": {
      markers = state.markers.slice();
      const { uuid, coordinates } = action.payload as SetMarkerPayload;
      markers.push({
        uuid,
        coordinates,
        name: `Marker ${state.markersDrawn + 1}`,
        description: "",
      });
      return {
        ...state,
        markers,
        markersDrawn: state.markersDrawn + 1,
        currentMarker: uuid,
      };
    }
    case "CLEAR_MARKER":
      markers = state.markers.slice();
      markers = markers.filter((marker) => marker.uuid !== action.payload);
      currentMarker =
        action.payload === state.currentMarker ? null : state.currentMarker;
      return {
        ...state,
        markers,
        currentMarker,
      };
    case "RENAME_MARKER": {
      const renamePayload = action.payload as RenameMarkerPayload;
      markers = state.markers.slice();
      markers = markers.map((marker) => {
        if (marker.uuid === renamePayload.uuid) {
          return {
            ...marker,
            name: renamePayload.name,
            description: renamePayload.description,
          };
        } else {
          return marker;
        }
      });
      return {
        ...state,
        markers: markers,
      };
    }
    case "SET_CURRENT_MARKER":
      return {
        ...state,
        currentMarker: action.payload as string,
      };
    case "SET_ACTIVE_POLYGON":
    case "CLEAR_CURRENT_MARKER":
      return {
        ...state,
        currentMarker: null,
      };
    case "LOAD_MAP":
    case "RELOAD_MAP": {
      const loadPayload = action.payload as LoadMapPayload;
      return {
        ...INITIAL_STATE,
        ...loadPayload.data.markers,
      };
    }
    case "NEW_MAP":
      return INITIAL_STATE;
    default:
      return state;
  }
};
