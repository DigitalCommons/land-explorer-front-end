import { Action } from "../types";

export type PropertyDisplayType =
  | "all"
  | "pending"
  | "localAuthority"
  | "churchOfEngland"
  | "socialHousing"
  | "unregistered";

type Property = {
  poly_id: string;
  title_no: string;
  proprietor_name_1?: string;
  proprietor_category_1?: string;
  [key: string]: unknown;
};

type HighlightedProperties = {
  [titleNo: string]: Property;
};

type RelatedProperties = {
  [titleNo: string]: Property;
};

type MapLayersData = {
  ownershipDisplay?: boolean | string | null;
  [key: string]: unknown;
};

type LandOwnershipState = {
  activeDisplay: PropertyDisplayType | null;
  visibleProperties: { [key: string]: Property };
  loadingProperties: boolean;
  highlightedProperties: HighlightedProperties;
  activePropertyTitleNo: string | null;
  relatedProperties: RelatedProperties;
  relatedPropertiesError: string | null;
  relatedPropertiesLoading: boolean;
  relatedPropertiesProprietorName: string | null;
};

const INITIAL_STATE: LandOwnershipState = {
  activeDisplay: null,
  visibleProperties: {},
  loadingProperties: false,
  highlightedProperties: {},
  activePropertyTitleNo: null,
  relatedProperties: {},
  relatedPropertiesError: null,
  relatedPropertiesLoading: false,
  relatedPropertiesProprietorName: null,
};

type LoadMapPayload = {
  data: {
    mapLayers: MapLayersData;
  };
};

export default (
  state: LandOwnershipState = INITIAL_STATE,
  action: Action
): LandOwnershipState => {
  switch (action.type) {
    case "TOGGLE_PROPERTY_DISPLAY": {
      const displayType = action.payload as PropertyDisplayType;
      if (state.activeDisplay === displayType) {
        // if this type was already on, turn it off
        return {
          ...state,
          activeDisplay: null,
        };
      }
      // otherwise, replace the active display with this type
      return {
        ...state,
        activeDisplay: displayType,
      };
    }
    case "SET_LOADING_PROPERTIES":
      return {
        ...state,
        loadingProperties: action.payload as boolean,
      };
    case "SET_VISIBLE_PROPERTIES":
      return {
        ...state,
        visibleProperties: action.payload as { [key: string]: Property },
      };
    case "HIGHLIGHT_PROPERTIES":
      return {
        ...state,
        highlightedProperties: {
          ...state.highlightedProperties,
          ...(action.payload as HighlightedProperties),
        },
      };
    case "CLEAR_HIGHLIGHTED_PROPERTIES": {
      const propertyTitleNosToClear = action.payload as string[];
      const rest = { ...state.highlightedProperties }; // Create a shallow copy
      propertyTitleNosToClear.forEach((id) => delete rest[id]);
      const activePropertyTitleNo = propertyTitleNosToClear.includes(
        state.activePropertyTitleNo as string
      )
        ? null
        : state.activePropertyTitleNo;

      return {
        ...state,
        highlightedProperties: rest,
        activePropertyTitleNo,
      };
    }
    case "CLEAR_ALL_HIGHLIGHTED_PROPERTIES":
      return {
        ...state,
        highlightedProperties: {},
        activePropertyTitleNo: null,
      };
    case "SET_ACTIVE_PROPERTY":
      return {
        ...state,
        activePropertyTitleNo: action.payload as string,
      };
    case "CLEAR_ACTIVE_PROPERTY":
      return {
        ...state,
        activePropertyTitleNo: null,
      };
    case "FETCH_RELATED_PROPERTIES_SUCCESS":
      return {
        ...state,
        relatedProperties: action.payload as RelatedProperties,
        relatedPropertiesError: null,
        relatedPropertiesLoading: false,
      };
    case "FETCH_RELATED_PROPERTIES_FAILURE":
      return {
        ...state,
        relatedProperties: {},
        relatedPropertiesError: action.payload as string,
        relatedPropertiesLoading: false,
      };
    case "FETCH_RELATED_PROPERTIES_LOADING":
      return {
        ...state,
        relatedPropertiesLoading: true,
      };
    case "SET_RELATED_PROPERTIES_PROPRIETOR_NAME":
      return {
        ...state,
        relatedPropertiesProprietorName: action.payload as string,
      };
    case "CLEAR_RELATED_PROPERTIES_AND_PROPRIETOR_NAME":
      return {
        ...state,
        relatedProperties: {},
        relatedPropertiesProprietorName: null,
      };
    case "LOAD_MAP":
    case "RELOAD_MAP": {
      const loadPayload = action.payload as LoadMapPayload;
      // this could be undefined, or just 'true' for old maps
      const ownershipDisplay =
        loadPayload.data.mapLayers.ownershipDisplay || null;

      if (ownershipDisplay === true) {
        return {
          ...state,
          activeDisplay: "all",
          highlightedProperties: {},
          activePropertyTitleNo: null,
        };
      }
      return {
        ...state,
        activeDisplay: ownershipDisplay as PropertyDisplayType | null,
      };
    }
    case "NEW_MAP":
      return INITIAL_STATE;
    default:
      return state;
  }
};
