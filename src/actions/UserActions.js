import { getRequest } from './common/RequestActions';

export const getUserDetails = () => {
    return async dispatch => {
        const userData = await dispatch(getRequest('/api/user/details'));
        if (userData) {
            dispatch({ type: 'POPULATE_USER', payload: userData });
        }
    }
}

export const changeUser = (newUserType) => {
    return {
        type: 'CHANGE_USER_TYPE',
        payload: {
            userType: newUserType,
        }
    }
}
