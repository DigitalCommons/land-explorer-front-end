// This reducer stores the drawn polygons and lines. Drawn markers are stored in the MarkersReducer.

const INITIAL_STATE = {
  drawings: [],
  activeDrawing: null,
  polygonsDrawn: 0,
  linesDrawn: 0,
};

export default (state = INITIAL_STATE, action) => {
  let drawings;
  switch (action.type) {
    case "ADD_DRAWING":
      drawings = state.drawings.slice();
      drawings.push(action.payload);
      // So the smaller ones are on top, so all the polygons can be clicked!
      drawings = drawings.sort((a, b) => a.area < b.area);
      const polygonsDrawn = state.polygonsDrawn || 0;
      const linesDrawn = state.linesDrawn || 0;
      return {
        ...state,
        drawings,
        polygonsDrawn:
          action.payload.type === "Polygon" ? polygonsDrawn + 1 : polygonsDrawn,
        linesDrawn:
          action.payload.type === "LineString" ? linesDrawn + 1 : linesDrawn,
        activeDrawing: action.payload.uuid,
      };
    case "UPDATE_DRAWING":
      drawings = state.drawings.map((drawing) => {
        if (drawing.uuid === action.payload.uuid) {
          return {
            ...drawing,
            data: action.payload.data,
            center: action.payload.center,
            length: action.payload.length,
            area: action.payload.area,
          };
        } else {
          return drawing;
        }
      });
      drawings = drawings.sort((a, b) => a.area < b.area);
      return {
        ...state,
        drawings,
      };
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
    case "RENAME_DRAWING":
      drawings = state.drawings.map((drawing) => {
        if (drawing.uuid === action.payload.uuid) {
          return {
            ...drawing,
            name: action.payload.name,
            description: action.payload.description,
          };
        } else {
          return drawing;
        }
      });
      return {
        ...state,
        drawings,
      };
    case "SET_ACTIVE_DRAWING":
      return {
        ...state,
        activeDrawing: action.payload,
      };
    case "SET_MARKER":
    case "SET_CURRENT_MARKER":
    case "CLEAR_ACTIVE_DRAWING":
      return {
        ...state,
        activeDrawing: null,
      };
    case "LOAD_MAP":
    case "RELOAD_MAP":
      return action.payload.data.drawings;
    case "NEW_MAP":
      return INITIAL_STATE;
    default:
      return state;
  }
};
