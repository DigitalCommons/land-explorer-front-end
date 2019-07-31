const INITIAL_STATE = {
    siteArea: '',
    landOwnership: '',
    agriculturalProperties: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_INFO_SITE_AREA':
            return {
                ...state,
                siteArea: action.payload
            }
        case 'SET_INFO_AGRICULTURAL':
            return {
                ...state,
                agriculturalProperties: action.payload
            }
        case 'NEW_MAP':
            return INITIAL_STATE;
        case 'CLEAR_INFO': {
            return INITIAL_STATE;
        }
        default:
            return state;
    }
}