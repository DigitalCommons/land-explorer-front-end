const INITIAL_STATE = {
    open: false,
    active: '',
    activeTool: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TOGGLE_NAVIGATION':
            return {
                ...state,
                open: !state.open
            }
        case 'OPEN_NAVIGATION':
            return {
                ...state,
                open: true
            }
        case 'CLOSE_NAVIGATION':
            return {
                ...state,
                open: false,
                active: '',
            }
        case 'SET_ACTIVE':
            return {
                ...state,
                active: action.payload,
                activeTool: state.active === 'Drawing Tools' ? state.activeTool : ''
            }
        case 'SET_ACTIVE_TOOL':
            return {
                ...state,
                activeTool: action.payload
            }
        case 'ADD_POLYGON':
        case 'SET_MARKER':
        case 'DESELECT_TOOLS':
            return {
                ...state,
                activeTool: ''
            }
        case 'TOGGLE_TOOL':
            return {
                ...state,
                activeTool: action.payload === state.activeTool ? '' : action.payload
            }
        case 'CLOSE_TRAY':
            return {
                ...state,
                active: '',
                activeTool: '',
            }
        case 'LOAD_MAP':
            return INITIAL_STATE;
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}