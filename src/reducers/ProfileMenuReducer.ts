const INITIAL_STATE = {
    open: false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TOGGLE_PROFILE_MENU':
            return {
                open: !state.open
            }
        case 'OPEN_PROFILE_MENU':
            return {
                open: true
            }
        case 'CLOSE_MENUS':
        case 'CLOSE_PROFILE_MENU':
            return {
                open: false
            }
        default:
            return state;
    }
}