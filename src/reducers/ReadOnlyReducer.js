const INITIAL_STATE = {
    readOnly: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'READ_ONLY_ON':
            return {
                readOnly: true
            }
        case 'NEW_MAP':
        case 'READ_ONLY_OFF':
            return {
                readOnly: false
            }
        default:
            return state;
    }
}
