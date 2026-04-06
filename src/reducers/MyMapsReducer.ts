import { Action } from "../types";

type MyMap = {
  eid: string;
  name: string;
  access: number;
  data: unknown;
  owner?: string;
  created?: string;
  updated?: string;
};

type MyMapsState = {
  maps: MyMap[];
  error: boolean;
};

const INITIAL_STATE: MyMapsState = {
  maps: [],
  error: false,
};

export default (
  state: MyMapsState = INITIAL_STATE,
  action: Action
): MyMapsState => {
  switch (action.type) {
    case "POPULATE_MY_MAPS":
      return {
        maps: action.payload as MyMap[],
        error: false,
      };
    case "MY_MAPS_ERROR":
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
