const INITIAL_STATE = {
    searchMarker: null,
    currentMarker: null,
    markersDrawn: 0,
    markers: [],
}

export default (state = INITIAL_STATE, action) => {
    let markers;
    let currentMarker;
    switch (action.type) {
      case "SET_MARKER":
        markers = state.markers.slice();
        const { uuid, coordinates } = action.payload;
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
      case "RENAME_MARKER":
        markers = state.markers.slice();
        markers = markers.map((marker) => {
          if (marker.uuid === action.payload.uuid) {
            return {
              ...marker,
              name: action.payload.name,
              description: action.payload.description,
            };
          } else {
            return marker;
          }
        });
        return {
          ...state,
          markers: markers,
        };
      case "UPDATE_MARKER":
        // markers = state.markers.slice();
        // debugger;
        markers = state.markers.slice();
        markers = state.markers.map((marker) => {
          if (marker.uuid === action.payload.uuid) {
            return {
              ...marker,
              data: action.payload.data,
              //   center: action.payload.center,
              description: action.payload.description,
            };
          } else {
            return marker;
          }
        });
      case "SET_CURRENT_MARKER":
        return {
          ...state,
          currentMarker: action.payload,
            };
      case "SET_ACTIVE_POLYGON":
      case "CLEAR_CURRENT_MARKER":
        return {
          ...state,
          currentMarker: null,
        };
      case "LOAD_MAP":
      case "RELOAD_MAP":
        return {
          ...INITIAL_STATE,
          ...action.payload.data.markers,
        };
      case "NEW_MAP":
        return INITIAL_STATE;
      default:
        return state;
    }
}
