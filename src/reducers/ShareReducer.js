const INITIAL_STATE = {
    mapToShare: null,
    emails: [],
};

export default (state = INITIAL_STATE, action) => {
    let emails;
    switch(action.type) {
        case 'SET_MAP_TO_SHARE':
            emails = action.payload.map.sharedWith.map((email) => email.emailAddress);
            return {
                ...state,
                mapToShare: action.payload,
                emails: emails,
            }
        case 'CLEAR_MAP_TO_SHARE':
            return {
                ...state,
                mapToShare: null,
                emails: [],
            }
        case 'POPULATE_MAP_TO_SHARE_EMAILS':
            return {
                ...state,
                emails: action.payload
            }
        case 'ADD_SHARE_EMAIL':
            emails = state.emails.slice();
            emails.push(action.payload);
            return {
                ...state,
                emails: emails
            }
        case 'REMOVE_SHARE_EMAIL':
            emails = state.emails.slice();
            emails.splice(action.payload, 1);
            return {
                ...state,
                emails: emails
            }
        default:
            return state;
    }
}