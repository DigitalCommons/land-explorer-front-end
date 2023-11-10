import { getRequest } from "./RequestActions";

export const highlightProperty = (property) => {
  return (dispatch) => {
    dispatch({
      type: "HIGHLIGHT_PROPERTY",
      payload: property,
    });
    dispatch(setActiveProperty(property.poly_id));
  };
};

export const setActiveProperty = (propertyId) => {
  return (dispatch) => {
    dispatch({
      type: "SET_ACTIVE_PROPERTY",
      payload: propertyId,
    });
    dispatch({
      type: "SET_ACTIVE",
      payload: "Land Information",
    });
  };
};

export const getRelatedProperties = (proprietorName) => {
  return async (dispatch) => {
    const relatedProperties = await dispatch(
      getRequest(`/api/search?proprietorName=${proprietorName}`)
    );

    if (relatedProperties.length > 0) {
      dispatch({
        type: "FETCH_PROPERTIES_SUCCESS",
        payload: relatedProperties,
      });
    } else {
      dispatch({
        type: "FETCH_PROPERTIES_FAILURE",
        payload: "No properties found",
      });
    }
  };
};
