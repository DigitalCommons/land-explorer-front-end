export const addMarker = (coordinates) => ({
    type: 'ADD_MARKER',
    payload: {
        location: coordinates,
    }
  });
