export const highlightProperty = (property) => {
  return dispatch => {
    dispatch({
      type: "HIGHLIGHT_PROPERTY",
      payload: property
    });
    dispatch(setActiveProperty(property.poly_id));
  }
}

export const setActiveProperty = (propertyId) => {
  return dispatch => {
    dispatch({
      type: "SET_ACTIVE_PROPERTY",
      payload: propertyId
    });
    dispatch({
      type: 'SET_ACTIVE',
      payload: 'Land Information'
    });
  }
}
