const INITIAL_STATE = {
    activeNodal: 0,
}
let activeNodal;

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'TURN_ON_NODAL':
            console.log(action.payload.id);
            activeNodal = action.payload.id;
            state.activeNodal = activeNodal;
            return {
                ...state,
                activeNodal,
            }
        case 'CLOSE_NODALS':
            console.log("nodals close command sent")
            activeNodal = 0;
            state.activeNodal = activeNodal;
            console.log(activeNodal);
            return {
                ...state,
                activeNodal,
            }
        default:
            return state;
    }

}