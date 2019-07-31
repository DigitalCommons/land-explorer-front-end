import axios from 'axios';
import constants from "../constants";


export const closeMenus = () => {
    return dispatch => {
        dispatch({ type: 'CLOSE_MENUS' })
    }
}

export const toggleMenuLayers = () => {
    return dispatch => {
        dispatch({ type: 'TOGGLE_MENU_LAYERS'});
    }
}

export const toggleMenuKey = () => {
    return dispatch => {
        dispatch({ type: 'TOGGLE_MENU_KEY' })
    }
}