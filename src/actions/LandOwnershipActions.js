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

export const highlightProperty = (highlightedProperty) => ({
  type: "HIGHLIGHT_PROPERTY",
  payload: {
    highlightedProperty: highlightedProperty
  }
});

export const clearHighlight = () => ({
  type: "CLEAR_HIGHLIGHT",
  payload: {},
});
