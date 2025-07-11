import { getRequest } from './RequestActions';

export const getUserDetails = () => {
    return async dispatch => {
        const userData = await dispatch(getRequest('/api/user/details'));
        if (userData) {
            dispatch({ type: 'POPULATE_USER', payload: userData });
        }
    }
}


export const getAskForFeedback = () => {
  return async (dispatch) => {
    const askForFeedback = await dispatch(
      getRequest("/api/user/ask-for-feedback")
    );
    console.log("API response for askForFeedback:", askForFeedback);
    if (askForFeedback) {
      dispatch({ type: "SET_ASK_FOR_FEEDBACK", payload: askForFeedback });
      console.log(
        "Dispatched SET_ASK_FOR_FEEDBACK with payload:",
        askForFeedback
      );
    }
  };
};

