import { LngLat, Action } from "../types";

// This reducer stores the drawn polygons and lines. Drawn markers are stored in the MarkersReducer.

type DrawingType = "Polygon" | "LineString";

type Drawing = {
  uuid: string;
  type: DrawingType;
  name: string;
  description: string;
  data: GeoJSON.Geometry;
  center: LngLat;
  length: number;
  area: number;
};

type DrawingsState = {
  drawings: Drawing[];
  activeDrawing: string | null;
  polygonsDrawn: number;
  linesDrawn: number;
};

const INITIAL_STATE: DrawingsState = {
  drawings: [],
  activeDrawing: null,
  polygonsDrawn: 0,
  linesDrawn: 0,
};

type UpdateDrawingPayload = {
  uuid: string;
  data: GeoJSON.Geometry;
  center: LngLat;
  length: number;
  area: number;
};

type RenameDrawingPayload = {
  uuid: string;
  name: string;
  description: string;
};

type LoadMapPayload = {
  data: {
    drawings: DrawingsState;
  };
};

type DrawingsAction =
  | (Action<Drawing> & { type: "ADD_DRAWING" })
  | (Action<UpdateDrawingPayload> & { type: "UPDATE_DRAWING" })
  | (Action<string> & { type: "DELETE_DRAWING" | "SET_ACTIVE_DRAWING" })
  | (Action<RenameDrawingPayload> & { type: "RENAME_DRAWING" })
  | (Action & {
      type:
        | "SET_MARKER"
        | "SET_CURRENT_MARKER"
        | "CLEAR_ACTIVE_DRAWING"
        | "NEW_MAP";
    })
  | (Action<LoadMapPayload> & { type: "LOAD_MAP" | "RELOAD_MAP" })
  | Action;

export default (
  state: DrawingsState = INITIAL_STATE,
  action: DrawingsAction
): DrawingsState => {
  let drawings: Drawing[];
  switch (action.type) {
    case "ADD_DRAWING": {
      const newDrawing = action.payload as Drawing;
      drawings = state.drawings.slice();
      drawings.push(newDrawing);
      // So the smaller ones are on top, so all the polygons can be clicked!
      drawings = drawings.sort((a, b) => (a.area < b.area ? 1 : -1));
      const polygonsDrawn = state.polygonsDrawn || 0;
      const linesDrawn = state.linesDrawn || 0;
      return {
        ...state,
        drawings,
        polygonsDrawn:
          newDrawing.type === "Polygon" ? polygonsDrawn + 1 : polygonsDrawn,
        linesDrawn:
          newDrawing.type === "LineString" ? linesDrawn + 1 : linesDrawn,
        activeDrawing: newDrawing.uuid,
      };
    }
    case "UPDATE_DRAWING": {
      const updatePayload = action.payload as UpdateDrawingPayload;
      drawings = state.drawings.map((drawing) => {
        if (drawing.uuid === updatePayload.uuid) {
          return {
            ...drawing,
            data: updatePayload.data,
            center: updatePayload.center,
            length: updatePayload.length,
            area: updatePayload.area,
          };
        } else {
          return drawing;
        }
      });
      drawings = drawings.sort((a, b) => (a.area < b.area ? 1 : -1));
      return {
        ...state,
        drawings,
      };
    }
    case "DELETE_DRAWING":
      drawings = state.drawings.filter((drawing) => {
        if (drawing.uuid === action.payload) {
          console.log("delete drawing", drawing);
          return false;
        } else {
          return true;
        }
      });
      return {
        ...state,
        drawings,
        activeDrawing: null,
      };
    case "RENAME_DRAWING": {
      const renamePayload = action.payload as RenameDrawingPayload;
      drawings = state.drawings.map((drawing) => {
        if (drawing.uuid === renamePayload.uuid) {
          return {
            ...drawing,
            name: renamePayload.name,
            description: renamePayload.description,
          };
        } else {
          return drawing;
        }
      });
      return {
        ...state,
        drawings,
      };
    }
    case "SET_ACTIVE_DRAWING":
      return {
        ...state,
        activeDrawing: action.payload as string,
      };
    case "SET_MARKER":
    case "SET_CURRENT_MARKER":
    case "CLEAR_ACTIVE_DRAWING":
      return {
        ...state,
        activeDrawing: null,
      };
    case "LOAD_MAP":
    case "RELOAD_MAP": {
      const loadPayload = action.payload as LoadMapPayload;
      return loadPayload.data.drawings;
    }
    case "NEW_MAP":
      return INITIAL_STATE;
    default:
      return state;
  }
};
