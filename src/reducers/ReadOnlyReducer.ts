import { Action } from "../types";

type ReadOnlyState = {
    readOnly: boolean;
};

const INITIAL_STATE: ReadOnlyState = {
    readOnly: false
}

type ReadOnlyAction = Action;

export default (state: ReadOnlyState = INITIAL_STATE, action: ReadOnlyAction): ReadOnlyState => {
    switch (action.type) {
        case 'READ_ONLY_ON':
            return {
                readOnly: true
            }
        case 'READ_ONLY_OFF':
            return {
                readOnly: false
            }
        default:
            return state;
    }
}
