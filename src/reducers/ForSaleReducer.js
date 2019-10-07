const INITIAL_STATE = {
    activeMarkers: [],
}
let activeMarkers;
let markerId;

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ADD_MARKER':
            console.log("the reducer has heard the action to add marker");
        default:
            return state;
    }
}

/* export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TOGGLE_MARKER':
            activeMarkers = state.activeMarkers.slice();
            markerId = action.payload;
            if (activeMarkers.indexOf(markerId) !== -1) {
                activeMarkers = activeMarkers.filter(e => e !== markerId);
            } else {
                activeMarkers.push(markerId);
            }
            return {
                ...state,
                activeMarkers: activeMarkers
            }
        case 'MARKER_OFF':
            activeMarkers = state.activeMarkers.slice();
            markerId = action.payload;
            if (activeMarkers.indexOf(markerId) !== -1) {
                activeMarkers = activeMarkers.filter(e => e !== markerId);
            }
            return {
                ...state,
                activeMarkers: activeMarkers
            }
        case 'MARKER_ON':
            activeMarkers = state.activeMarkers.slice();
            markerId = action.payload;
            activeMarkers.push(markerId);
            return {
                ...state,
                activeMarkers: activeMarkers
            }
        case 'LOAD_MAP':
            return action.payload.mapmarkers;
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}*/