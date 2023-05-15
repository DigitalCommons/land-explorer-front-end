import { getRequest } from './RequestActions';

export const getUserDetails = () => {
    return async dispatch => {
        const userData = await dispatch(getRequest('/api/user/details'));
        if (userData) {
            dispatch({ type: 'POPULATE_USER', payload: userData });
        }
    }
}
