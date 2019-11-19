const INITIAL_STATE = {
    activeNodal: "",
}
let activeNodal;

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'TURN_ON_MODAL':
            activeNodal = action.payload;
            this.state.activeNodal = activeNodal;
            return {
                ...state,
                activeNodal,
            }
        case 'CLOSE_MODALS':
            activeNodal = "";
            this.state.activeNodal = activeNodal;
            return {
                ...state,
                activeNodal,
            }
        default:
            return state;
    }

}