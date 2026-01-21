import { getRequest } from "./RequestActions";
import { autoSave } from "./MapActions";

/**
 * @param {string} type "all", "pending", "localAuthority", "churchOfEngland" or "unregistered"
 */

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

export const clearHighlightedProperties = (propertyTitleNos) => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_HIGHLIGHTED_PROPERTIES",
      payload: propertyTitleNos,
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

export const setActiveProperty = (titleNo) => {
  return (dispatch, getState) => {
    // First clear the active property to trigger scroll to the property, even if it was already
    // active
    dispatch({
      type: "SET_ACTIVE_PROPERTY",
      payload: null,
    });
    dispatch({
      type: "SET_ACTIVE_PROPERTY",
      payload: titleNo,
    });
    dispatch({
      type: "SET_ACTIVE",
      payload: "Land Information",
    });
    console.log(
      "setActiveProperty",
      getState().landOwnership.highlightedProperties[titleNo]
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

    const relatedPropertiesTitleMap = await dispatch(
      getRequest(`/api/search?proprietorName=${proprietorName}`)
    );

    if (relatedPropertiesTitleMap !== null) {
      dispatch({
        type: "FETCH_RELATED_PROPERTIES_SUCCESS",
        payload: relatedPropertiesTitleMap,
      });
    } else {
      dispatch({
        type: "FETCH_RELATED_PROPERTIES_FAILURE",
        payload: "Error fetching related properties",
      });
    }
  };
};


export const togglePropertyDisplay = (type) => {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_PROPERTY_DISPLAY", payload: type });
    console.log(`Toggled property display to ${type}`);
    return dispatch(autoSave());
  };
};