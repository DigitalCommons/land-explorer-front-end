const INITIAL_STATE = {
    maps: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'POPULATE_MY_MAPS':
            return {
              maps: action.payload
            }
        default:
            return state;
    }
}