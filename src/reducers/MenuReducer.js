const INITIAL_STATE = {
  staticSite: false,
  key: false,
  councilKey: false,
  profile: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "TOGGLE_STATIC_SITE_MENU":
        return {
          ...state,
          staticSite: !state.staticSite,
          profile: false,
        };
      case "OPEN_STATIC_SITE_MENU":
        return {
          ...state,
          staticSite: true,
          profile: false,
        };
      case "CLOSE_STATIC_SITE_MENU":
        return {
          ...state,
          staticSite: false,
        };
      case "TOGGLE_MENU_PROFILE":
        return {
          ...state,
          profile: !state.profile,
          staticSite: false,
        };
      case "OPEN_MENU_PROFILE":
        return {
          ...state,
          profile: true,
        };
      case "CLOSE_MENU_PROFILE":
        return {
          ...state,
          profile: false,
        };
      case "TOGGLE_MENU_COUNCILKEY":
        return {
          ...state,
          councilKey: !state.councilKey,
          layers: false,
        };
      case "OPEN_MENU_COUNCILKEY":
        return {
          ...state,
          councilKey: true,
          layers: false,
        };
      case "CLOSE_MENU_COUNCILKEY":
        return {
          ...state,
          councilKey: false,
          layers: false,
        };
      case "CLOSE_MENUS":
        return {
          ...state,
          staticSite: false,
          profile: false,
          layers: false,
          key: false,
        };
      case "OPEN_MODAL":
      case "LOAD_MAP":
      case "NEW_MAP":
        return INITIAL_STATE;
      default:
        return state;
    }
}
