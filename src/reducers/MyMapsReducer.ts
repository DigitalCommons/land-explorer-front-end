import { Action } from "../types";

export type MyMap = {
  eid: number;
  name: string;
  access: number;
  isSnapshot: boolean;
  sharedWith: {
    email: string;
    access: number;
  }[];
  viewed: boolean;
  accessGrantedDate: Date;
  createdDate: Date;
  lastModified: Date;
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
