import { getRequest } from "./RequestActions";
import { autoSave } from './MapActions';

export const togglePropertyDisplay = () => {
  return dispatch => {
    dispatch({ type: "TOGGLE_PROPERTY_DISPLAY" });
    return dispatch(autoSave());
  };
}

export const highlightProperties = (properties) => {
  return dispatch => {
    dispatch({
      type: "HIGHLIGHT_PROPERTIES",
      payload: properties
    });
    // TODO: set multiple active rather than just the 1st. This is kind of related to #296 and #292
    dispatch(setActiveProperty(Object.keys(properties)[0]));
  };
};

export const clearHighlightedProperty = (propertyPolyId) => {
  return dispatch => {
    dispatch({
      type: "CLEAR_HIGHLIGHTED_PROPERTY",
      payload: propertyPolyId
    })
  }
};

export const clearAllHighlightedProperties = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_ALL_HIGHLIGHTED_PROPERTIES"
    })
  }
};

export const setActiveProperty = (propertyId) => {
  return dispatch => {
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
  return async dispatch => {
    try {
      dispatch({ type: "FETCH_PROPERTIES_LOADING" });

      const relatedPropertiesArray = await dispatch(
        getRequest(`/api/search?proprietorName=${proprietorName}`)
      );

      if (relatedPropertiesArray.length > 0) {
        // Convert array to a map so we can search by poly_id more efficiently
        const relatedPropertiesMap = relatedPropertiesArray.reduce((map, property) => {
          if (property.poly_id) { // filter out bad data with null poly_id
            map[property.poly_id] = property;
          }
          return map;
        }, {});

        dispatch({
          type: "FETCH_PROPERTIES_SUCCESS",
          payload: relatedPropertiesMap,
        });
      } else {
        dispatch({
          type: "FETCH_PROPERTIES_FAILURE",
          payload: "No properties found",
        });
      }
    } catch (error) {
      dispatch({
        type: "FETCH_PROPERTIES_FAILURE",
        payload: "Error fetching properties",
      });
    }
  };
};

export const setProprietorName = (proprietorName) => {
  return {
    type: "SET_PROPRIETOR_NAME",
    payload: proprietorName,
  }
};

export const selectRelatedProperties = (properties) => {
  return dispatch => {
    dispatch({
      type: "SELECT_PROPERTIES",
      payload: properties,
    });
  };
};

export const clearSelectedProperty = (propertyPolyId) => {
  return dispatch => {
    dispatch({
      type: "CLEAR_SELECTED_PROPERTY",
      payload: propertyPolyId
    })
  }
}

export const clearAllSelectedProperties = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_ALL_SELECTED_PROPERTIES"
    })
  }
}
