const INITIAL_STATE = {
    isOnline: true
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ONLINE':
            return {
                isOnline: true
            }
        case 'OFFLINE':
            return {
                isOnline: false
            }
        default:
            return state;
    }
}
