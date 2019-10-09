export const addMarker = (marker) => ({
    type: 'ADD_MARKER',
    payload: {
        location: marker.coordinates,
        name:       marker.name,
        price:      marker.price,
    }
  })

export const clearMarkers = () => ({
    type: 'CLEAR_MARKERS',
    payload: {}
});
