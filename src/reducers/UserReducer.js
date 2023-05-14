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
    privileged: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'POPULATE_USER':
            return {
                ...state,
                ...action.payload,
                populated: true,
                privileged: (action.payload.is_super_user === 1),
                initials: action.payload.firstName[0].toUpperCase() + action.payload.lastName[0].toUpperCase(),
            }
        default:
            return state;
    }
}
