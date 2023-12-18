import { getRequest } from "./RequestActions";
import { autoSave } from './MapActions';

export const togglePropertyDisplay = () => {
  return dispatch => {
    dispatch({ type: "TOGGLE_PROPERTY_DISPLAY" });
    return dispatch(autoSave());
  };
}

export const highlightProperty = (property) => {
  return (dispatch) => {
    dispatch({
      type: "HIGHLIGHT_PROPERTY",
      payload: property,
    });
    dispatch(setActiveProperty(property.poly_id));
  };
};

export const clearAllHighlightedProperties = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_ALL_HIGHLIGHTED_PROPERTIES"
    })
  }
}

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
    dispatch({ type: "FETCH_PROPERTIES_LOADING" });

    const relatedProperties = await dispatch(
      getRequest(`/api/search?proprietorName=${proprietorName}`)
    );

    if (relatedProperties !== null) {
      dispatch({ type: "FETCH_PROPERTIES_SUCCESS", payload: relatedProperties });
    } else {
      dispatch({ type: "FETCH_PROPERTIES_FAILURE", payload: "Error fetching properties" });
    }
  };
};

export const setProprietorName = (proprietorName) => {
  return {
    type: "SET_PROPRIETOR_NAME",
    payload: proprietorName,
  }
};

export const setActivePropertyId = (propertyId) => { }

export const setSelectedProperty = (property) => {
  return (dispatch) => {
    dispatch({
      type: "SET_SELECTED_PROPERTY",
      payload: property,
    });
  };
};

export const clearSelectedProperty = (property) => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_SELECTED_PROPERTY",
      payload: property
    })
  }
}

export const setMultipleSelectedProperties = (properties) => {
  return (dispatch) => {
    dispatch({
      type: "SET_MULTIPLE_SELECTED_PROPERTIES",
      payload: properties,
    });
  };
}

export const clearAllSelectedProperties = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_ALL_SELECTED_PROPERTIES"
    })
  }
}

export const showPropertyPolygon = (propertyCoordinates) => {
  return (dispatch) => {
    dispatch({
      type: "SHOW_PROPERTY_POLYGON",
      payload: propertyCoordinates,
    });
  };
};
