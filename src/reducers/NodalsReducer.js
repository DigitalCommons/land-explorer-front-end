const INITIAL_STATE = {
    activeNodal: -1,
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
            activeNodal = -1;
            state.activeNodal = activeNodal;
            return {
                ...state,
                activeNodal,
            }

            case 'DELETE_NODAL':
                let {activeNodal}=state 
                console.log(activeNodal)

                // state.activeNodal =activeNodal;
                return state.filter((data,i) => i !== activeNodal);
                
                
        default:
            return state;
    }

}