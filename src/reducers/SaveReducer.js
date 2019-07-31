const INITIAL_STATE = {
    saveAs: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SAVE_AS_ON': {
            return {
                ...state,
                saveAs: true
            }
        }
        case 'SAVE_AS_OFF': {
            return {
                ...state,
                saveAs: false
            }
        }
        default:
            return state;
    }
}