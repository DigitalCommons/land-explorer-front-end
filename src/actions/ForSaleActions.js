export const addMarker = marker => ({
  type: "ADD_MARKER",
  payload: {
    location: marker.location,
    name: marker.name,
    price: marker.price
  }
});

export const clearMarkers = () => ({
  type: "CLEAR_MARKERS",
  payload: {}
});

export const postCurrentView = currentView => ({
  type: "POST_CURRENT_VIEW",
  payload: currentView
});
