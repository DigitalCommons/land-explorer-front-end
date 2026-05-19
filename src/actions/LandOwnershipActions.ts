import { getRequest } from "./RequestActions";
import { autoSave } from "./MapActions";
import { PropertyDisplayType } from "@/reducers/LandOwnershipReducer";

export const fetchPropertiesInBox = (
  sw_lng: number,
  sw_lat: number,
  ne_lng: number,
  ne_lat: number
) => {
  return async (dispatch: any, getState: any) => {
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

export const highlightProperties = (properties: any) => {
  return (dispatch: any) => {
    dispatch({
      type: "HIGHLIGHT_PROPERTIES",
      payload: properties,
    });
  };
};

export const clearHighlightedProperties = (propertyTitleNos: string[]) => {
  return (dispatch: any) => {
    dispatch({
      type: "CLEAR_HIGHLIGHTED_PROPERTIES",
      payload: propertyTitleNos,
    });
  };
};

export const clearAllHighlightedProperties = () => {
  return (dispatch: any) => {
    dispatch({
      type: "CLEAR_ALL_HIGHLIGHTED_PROPERTIES",
    });
  };
};

export const setActiveProperty = (titleNo: string) => {
  return (dispatch: any, getState: any) => {
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

export const fetchRelatedProperties = (proprietorName: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: "SET_RELATED_PROPERTIES_PROPRIETOR_NAME",
      payload: proprietorName,
    });
    dispatch({ type: "FETCH_RELATED_PROPERTIES_LOADING" });

    const relatedPropertiesTitleMap = await dispatch(
      getRequest(
        `/api/search?proprietorName=${encodeURIComponent(proprietorName)}`,
      ),
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

export const togglePropertyDisplay = (type: PropertyDisplayType) => {
  return (dispatch: any) => {
    dispatch({ type: "TOGGLE_PROPERTY_DISPLAY", payload: type });
    return dispatch(autoSave());
  };
};
