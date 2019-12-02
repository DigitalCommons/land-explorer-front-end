import axios from 'axios';
import constants from "../constants";

export const getUserDetails = () => {
    return dispatch => {
        let config = {headers: {'Authorization': "bearer " + localStorage.getItem('token')}};
        axios.get(`${constants.ROOT_URL}/api/user/details/`,config)
            .then((response) => {
                if (response.status === 200) {
                    if (response.status === 200) {
                        dispatch({ type: 'POPULATE_USER', payload: response.data })
                    }
                } else {
                    console.log("error", response.status);
                }
            })
    }
}

export const changeUser = (newUserType) => {
    return {
        type: 'CHANGE_USER_TYPE',
        payload: {
            userType:   newUserType,
        }
      }
}