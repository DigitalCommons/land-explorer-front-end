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
  };
};

export const clearHighlightedProperties = (propertyPolyIds) => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_HIGHLIGHTED_PROPERTIES",
      payload: propertyPolyIds,
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

export const fetchRelatedProperties = (proprietorName) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_RELATED_PROPERTIES_PROPRIETOR_NAME",
      payload: proprietorName,
    });
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
        payload: "Error fetching related properties",
      });
    }
  };
};
