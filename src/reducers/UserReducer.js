const INITIAL_STATE = {
    initials: '',
    pic: '',
    firstName: '',
    lastName: '',
    address: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    marketing: '',
    organisation: '',
    organisationNumber: '',
    organisationType: '',
    organisationActivity: '',
    password: '',
    phone: '',
    username: '',
    populated: false,
    type:   ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'POPULATE_USER':
            return {
                ...state,
                ...action.payload,
                populated: true,
                initials: action.payload.firstName[0].toUpperCase() + action.payload.lastName[0].toUpperCase(),
                type:   'core',
            }
        default:
            return state;
    }
}