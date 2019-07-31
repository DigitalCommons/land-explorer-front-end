const INITIAL_STATE = {
    layer: 'topography',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'MAP_LAYER_AERIAL':
            return {
                ...state,
                layer: 'aerial',
            }
        case 'MAP_LAYER_TOPOGRAPHY':
            return {
                ...state,
                layer: 'topography'
            }
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}