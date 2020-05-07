export const viewAddressInfo = (address) => ({
  type: "VIEW_ADDRESS_INFO",
  payload: {
    address: address,
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
