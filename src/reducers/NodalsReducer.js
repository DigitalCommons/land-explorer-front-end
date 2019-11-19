const INITIAL_STATE = {
    activeNodal: 0,
}
let activeNodal;

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'TURN_ON_NODAL':
            activeNodal = action.payload.id;
            state.activeNodal = activeNodal;
            return {
                ...state,
                activeNodal,
            }
        case 'CLOSE_NODALS':
            activeNodal = 0;
            state.activeNodal = activeNodal;
            return {
                ...state,
                activeNodal,
            }
        default:
            return state;
    }

}