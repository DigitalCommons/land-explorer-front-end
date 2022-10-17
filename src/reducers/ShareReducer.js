const INITIAL_STATE = {
    mapToShare: null,
    emails: [],
};

export default (state = INITIAL_STATE, action) => {
    let emails;
    switch (action.type) {
        case 'SET_MAP_TO_SHARE':
            emails = action.payload.map.sharedWith.map((email) => email.emailAddress);
            return {
                ...state,
                mapToShare: action.payload,
                emails: emails,
            }
        default:
            return state;
    }
}