const INITIAL_STATE = {
    main: false,
    key: false,
    councilKey: false,
    profile: false,
    layers: false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TOGGLE_MENU_MAIN':
            return {
                ...state,
                main: !state.main,
                profile: false,
            }
        case 'OPEN_MENU_MAIN':
            return {
                ...state,
                main: true,
                profile: false
            }
        case 'CLOSE_MENU_MAIN':
            return {
                ...state,
                main: false,
            }
        case 'TOGGLE_MENU_PROFILE':
            return {
                ...state,
                profile: !state.profile,
                main: false
            }
        case 'OPEN_MENU_PROFILE':
            return {
                ...state,
                profile: true
            }
        case 'CLOSE_MENU_PROFILE':
            return {
                ...state,
                profile: false,
            }
        case 'TOGGLE_MENU_LAYERS':
            return {
                ...state,
                layers: !state.layers,
                key: false,
            }
        case 'OPEN_MENU_LAYERS':
            return {
                ...state,
                layers: true,
                key: false,
            }
        case 'CLOSE_MENU_LAYERS':
            return {
                ...state,
                layers: false,
                key: false,
            }
        case 'TOGGLE_MENU_KEY':
            return {
                ...state,
                key: !state.key,
                layers: false,
            }
        case 'OPEN_MENU_KEY':
            return {
                ...state,
                key: true,
                layers: false,
            }
        case 'CLOSE_MENU_KEY':
            return {
                ...state,
                key: false,
                layers: false,
            }
        case 'TOGGLE_MENU_COUNCILKEY':
            return {
                ...state,
                councilKey: !state.councilKey,
                layers: false,
            }
        case 'OPEN_MENU_COUNCILKEY':
            return {
                    ...state,
                    councilKey: true,
                    layers: false,
                }
        case 'CLOSE_MENU_COUNCILKEY':
            return {
                    ...state,
                    councilKey: false,
                    layers: false,
                }            
        case 'CLOSE_MENUS':
            return {
                ...state,
                main: false,
                profile: false,
                layers: false,
                key: false,
            }
        case 'OPEN_MODAL':
        case 'LOAD_MAP':
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}