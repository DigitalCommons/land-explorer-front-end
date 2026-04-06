import { Action } from "../types";

type DataGroup = {
  id: number;
  title: string;
  hex_colour: string;
  access: number;
  userGroupId: number;
  description?: string;
  markers: any[];
  polygons: any[];
  lines: any[];
};

type GroupTitleAndID = {
  id: number;
  title: string;
  hex_colour: string;
  access?: number;
};

type DataGroupsState = {
  userGroupTitlesAndIDs: GroupTitleAndID[];
  activeGroups: number[];
  dataGroupsData: DataGroup[];
};

const INITIAL_STATE: DataGroupsState = {
  userGroupTitlesAndIDs: [],
  activeGroups: [],
  dataGroupsData: [],
};

type MyDataLayer = {
  iddata_groups?: number;
};

type LoadMapPayload = {
  data: {
    mapLayers: {
      myDataLayers: (MyDataLayer | number)[];
    };
  };
};

type DataGroupsAction =
  | (Action<GroupTitleAndID[]> & { type: "SET_USER_GROUP_TITLES" })
  | (Action<number> & { type: "TOGGLE_DATA_GROUP" })
  | (Action<DataGroup[]> & { type: "STORE_DATA_GROUPS_DATA" })
  | (Action<LoadMapPayload> & { type: "LOAD_MAP" | "RELOAD_MAP" })
  | (Action & { type: "NEW_MAP" })
  | Action;

export default (
  state: DataGroupsState = INITIAL_STATE,
  action: DataGroupsAction
): DataGroupsState => {
  let activeGroups: number[];
  switch (action.type) {
    case "SET_USER_GROUP_TITLES":
      return {
        ...state,
        userGroupTitlesAndIDs: action.payload as GroupTitleAndID[],
      };
    case "TOGGLE_DATA_GROUP": {
      const groupId = action.payload as number;
      if (state.activeGroups.includes(groupId)) {
        activeGroups = state.activeGroups.filter((id) => id != groupId);
      } else {
        activeGroups = state.activeGroups.concat([groupId]);
      }
      return {
        ...state,
        activeGroups,
      };
    }
    case "STORE_DATA_GROUPS_DATA":
      return {
        ...state,
        dataGroupsData: action.payload as DataGroup[],
      };
    case "LOAD_MAP":
    case "RELOAD_MAP": {
      const loadPayload = action.payload as LoadMapPayload;
      const { myDataLayers } = loadPayload.data.mapLayers;
      // Old version contains array of objects, but now just contains array of data group IDs
      activeGroups = myDataLayers.map((myDataLayer) => {
        if (typeof myDataLayer === "number") {
          return myDataLayer;
        }
        return myDataLayer.iddata_groups as number;
      });
      return {
        ...state,
        activeGroups,
      };
    }
    case "NEW_MAP":
      return {
        ...state,
        activeGroups: [],
      };
    default:
      return state;
  }
};
