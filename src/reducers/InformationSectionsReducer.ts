const INITIAL_STATE = {
    siteArea: false,
    landOwnership: false,
    agriculturalGrade: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TOGGLE_SECTION':
            return {
                ...state,
                [action.payload]: !state[action.payload]
            }
        case 'OPEN_SECTION':
            return {
                ...state,
                [action.payload]: true
            }
        case 'CLOSE_SECTION':
            return {
                ...state,
                [action.payload]: false
            }
        default:
            return state;
    }
}