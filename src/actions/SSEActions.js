import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";

export const establishSSEConnection = () => {
  return async (dispatch) => {
    const url = `${constants.ROOT_URL}/api/sse`;
    const sse = new EventSource(url, getAuthHeader());
    // const sse = new EventSource(`${constants.ROOT_URL}$/api/sse`);

    sse.onopen = () => {
      dispatch({ type: "SSE_CONNECT", payload: sse });
    };
    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch({ type: "SSE_MESSAGE", payload: data });
    };
    sse.onerror = () => {
      dispatch({ type: "SSE_DISCONNECT", payload: sse });
    };
  };
};

export const closeSSEConnection = () => {
  return (dispatch, getState) => {
    const sse = getState().sse.sseConnection; // Access SSE object from the state
    
    console.log("closing SSE connection");
    sse.close(); // Close the SSE connection
    // if (sse) {
    //   sse.close(); // Close the SSE connection if it exists
    // }
    dispatch({ type: "SSE_DISCONNECT" }); // Dispatch action to update state
  };
};

export const handleSSEError = (error) => {
  return (dispatch) => {
    dispatch({ type: "SSE_CONNECTION_ERROR", payload: error });
  };
};

export const retrySSEConnection = () => {
  return (dispatch) => {
    dispatch({ type: "SSE_CONNECTION_RETRY" });
  };
};

export const resetSSEConnection = () => {
  return (dispatch) => {
    dispatch({ type: "SSE_CONNECTION_RESET" });
  };
};
