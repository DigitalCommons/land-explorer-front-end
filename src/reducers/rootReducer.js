import { combineReducers } from "redux";
import AuthenticationReducer from "./AuthenticationReducer";
import MenuReducer from "./MenuReducer";
import ProfileMenuReducer from "./ProfileMenuReducer";
import LeftPaneReducer from "./LeftPaneReducer";
import ModalReducer from "./ModalReducer";
import MapReducer from "./MapReducer";
import MapBaseLayerReducer from "./MapBaseLayerReducer";
import MapLayersReducer from "./MapLayersReducer";
import UserReducer from "./UserReducer";
import InformationReducer from "./InformationReducer";
import InformationSectionsReducer from "./InformationSectionsReducer";
import MarkersReducer from "./MarkersReducer";
import DrawingsReducer from "./DrawingsReducer";
import ReadOnlyReducer from "./ReadOnlyReducer";
import MyMapsReducer from "./MyMapsReducer";
import MapMetaReducer from "./MapMetaReducer";
import LandOwnershipReducer from "./LandOwnershipReducer";
import DataGroupsReducer from "./DataGroupsReducer";
import ConnectivityReducer from "./ConnectivityReducer";

const appReducer = combineReducers({
  authentication: AuthenticationReducer,
  menu: MenuReducer,
  profileMenu: ProfileMenuReducer,
  leftPane: LeftPaneReducer,
  modal: ModalReducer,
  map: MapReducer,
  mapBaseLayer: MapBaseLayerReducer,
  mapLayers: MapLayersReducer,
  markers: MarkersReducer,
  user: UserReducer,
  information: InformationReducer,
  informationSections: InformationSectionsReducer,
  drawings: DrawingsReducer,
  readOnly: ReadOnlyReducer,
  myMaps: MyMapsReducer,
  mapMeta: MapMetaReducer,
  landOwnership: LandOwnershipReducer,
  dataGroups: DataGroupsReducer,
  connectivity: ConnectivityReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial state when user logs out
  if (action.type === "LOG_OUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
