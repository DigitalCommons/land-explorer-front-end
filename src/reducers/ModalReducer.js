const INITIAL_STATE = {
    save: {
        open: false,
        canToggle: true,
    },
    share: {
        open: false,
        canToggle: true,
    },
    myMaps: {
        open: false,
        canToggle: true,
    },
    mySharedMaps: {
        open: false,
        canToggle: true,
    },
    location: {
        open: false,
        canToggle: false,
    },
    newMap: {
        open: false,
        canToggle: true,
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    open: !this.state[action.payload].open
                }
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    open: false,
                }
            }
        case 'OPEN_MODAL':
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    open: true,
                }
            }
        default:
            return state;
    }
}