const INITIAL_STATE = {
  zoom: [6],
  lngLat: [-1.5, 53],
  searchMarker: null,
  currentLocation: null,
  movingMethod: "flyTo",
  name: null,
};

export default (state = INITIAL_STATE, action) => {
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
        zoom: action.payload,
      };
    case "SET_LNG_LAT":
      return {
        ...state,
        lngLat: action.payload,
      };
    case "SET_CURRENT_LOCATION":
      return {
        ...state,
        currentLocation: action.payload,
      };
    case "SET_SEARCH_MARKER":
      return {
        ...state,
        searchMarker: action.payload,
      };
    case "CLEAR_SEARCH_MARKER":
      return {
        ...state,
        searchMarker: null,
      };
    case "CHANGE_MOVING_METHOD":
      return {
        ...state,
        movingMethod: action.payload,
      };
    case "SAVE_MAP":
      return action.payload.map;
    case "LOAD_MAP":
      return {
        ...action.payload.data.map,
        movingMethod: "jumpTo",
      };
    case "RELOAD_MAP":
      return {
        ...state,
        name: action.payload.data.map.name,
      };
    case "NEW_MAP":
      return {
        ...INITIAL_STATE,
        movingMethod: "jumpTo",
      };
    case "SET_MAP_NAME":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};
