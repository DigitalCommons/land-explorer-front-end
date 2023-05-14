export const viewAddressInfo = (propertyInformation) => ({
  type: "VIEW_ADDRESS_INFO",
  payload: {
    propertyInformation: propertyInformation,
  },
});

export const displayProperties = () => ({
  type: "DISPLAY_PROPERTIES",
  payload: {},
});

export const stopDisplayingProperties = () => ({
  type: "STOP_DISPLAYING_PROPERTIES",
  payload: {},
});

export const highlightProperty = (property) => {
  return dispatch => {
    dispatch({
      type: "HIGHLIGHT_PROPERTY",
      payload: {
        highlightedProperty: property
      }
    });
    dispatch({ type: 'SET_ACTIVE', payload: 'Land Information' });
  }
}

export const clearHighlight = (property) => ({
  type: "CLEAR_HIGHLIGHT",
  payload: {
    property: property
  },
});

export const clearAllHighlight = () => ({
  type: "CLEAR_ALL_HIGHLIGHT",
  payload: {},
})

export const toggleHighlightMultiple = () => ({
  type: "TOGGLE_HIGHLIGHT_MULTIPLE",
  payload: {},
})
