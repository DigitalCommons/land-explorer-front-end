import { getRequest } from "./RequestActions";
import { autoSave } from './MapActions';

/**
 * @param {string} type "all", "pending", "localAuthority" or "churchOfEngland"
 */
export const togglePropertyDisplay = (type) => {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_PROPERTY_DISPLAY", payload: type });
    return dispatch(autoSave());
  };
};

export const fetchPropertiesInBox = (sw_lng, sw_lat, ne_lng, ne_lat) => {
  return async (dispatch, getState) => {
    dispatch({ type: "SET_LOADING_PROPERTIES", payload: true });

    const propertiesType = getState().landOwnership.activeDisplay;

    const properties = propertiesType
      ? await dispatch(
          getRequest(
            `/api/ownership?sw_lng=${sw_lng}&sw_lat=${sw_lat}&ne_lng=${ne_lng}&ne_lat=${ne_lat}&type=${propertiesType}`
          )
        )
      : null;

    if (properties) {
      dispatch({ type: "SET_VISIBLE_PROPERTIES", payload: properties });
      dispatch({ type: "SET_LOADING_PROPERTIES", payload: false });
    }
  };
};

export const highlightProperties = (properties) => {
  return (dispatch) => {
    dispatch({
      type: "HIGHLIGHT_PROPERTIES",
      payload: properties,
    });
    // TODO: set multiple active rather than just the 1st. This is kind of related to #296 and #292
    dispatch(setActiveProperty(Object.keys(properties)[0]));
  };
};

export const clearHighlightedProperty = (propertyPolyId) => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_HIGHLIGHTED_PROPERTY",
      payload: propertyPolyId,
    });
  };
};

export const clearAllHighlightedProperties = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_ALL_HIGHLIGHTED_PROPERTIES",
    });
  };
};

export const setActiveProperty = (propertyId) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_ACTIVE_PROPERTY",
      payload: propertyId,
    });
    dispatch({
      type: "SET_ACTIVE",
      payload: "Land Information",
    });
    console.log(
      "setActiveProperty",
      getState().landOwnership.highlightedProperties[propertyId]
    );
  };
};

export const getRelatedProperties = (proprietorName) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_RELATED_PROPERTIES_LOADING" });

    const relatedPropertiesArray = await dispatch(
      getRequest(`/api/search?proprietorName=${proprietorName}`)
    );

    if (relatedPropertiesArray !== null) {
      // Convert array to a map so we can search by poly_id more efficiently
      const relatedPropertiesMap = relatedPropertiesArray.reduce(
        (map, property) => {
          if (property.poly_id) {
            // filter out bad data with null poly_id
            map[property.poly_id] = property;
          }
          return map;
        },
        {}
      );

      dispatch({
        type: "FETCH_RELATED_PROPERTIES_SUCCESS",
        payload: relatedPropertiesMap,
      });
    } else {
      dispatch({
        type: "FETCH_RELATED_PROPERTIES_FAILURE",
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
