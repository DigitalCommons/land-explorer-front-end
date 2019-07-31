import axios from 'axios';
import constants from "../constants";


export const openModal = (name) => {
    return dispatch => {
        dispatch({
            type: 'OPEN_MODAL',
            payload: name
        })
    }
}

export const closeModal = (name) => {
    return dispatch => {
        dispatch({
            type: 'CLOSE_MODAL',
            payload: name
        })
    }
}