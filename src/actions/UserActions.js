import axios from 'axios';
import constants from "../constants";


export const getUserDetails = () => {
    return dispatch => {
        axios.get(`${constants.ROOT_URL}/api/user/details/`)
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

