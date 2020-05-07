import { combineReducers } from "redux";
import AuthenticationReducer from "./AuthenticationReducer";
import MenuReducer from "./MenuReducer";
import ProfileMenuReducer from "./ProfileMenuReducer";
import NavigationReducer from "./NavigationReducer";
import ModalReducer from "./ModalReducer";
import MapReducer from "./MapReducer";
import MapBaseLayerReducer from "./MapBaseLayerReducer";
import MapLayersReducer from "./MapLayersReducer";
import UserReducer from "./UserReducer";
import InformationReducer from "./InformationReducer";
import InformationSectionsReducer from "./InformationSectionsReducer";
import MarkersReducer from "./MarkersReducer";
import DrawingReducer from "./DrawingReducer";
import ReadOnlyReducer from "./ReadOnlyReducer";
import SaveReducer from "./SaveReducer";
import MyMapsReducer from "./MyMapsReducer";
import MapMetaReducer from "./MapMetaReducer";
import ShareReducer from "./ShareReducer";
import ForSaleReducer from "./ForSaleReducer";
import CommunityAssetsReducer from "./CommunityAssetsReducer";
import NodalsReducer from "./NodalsReducer";
import LandOwnershipReducer from "./LandOwnershipReducer";

export default combineReducers({
  authentication: AuthenticationReducer,
  menu: MenuReducer,
  profileMenu: ProfileMenuReducer,
  navigation: NavigationReducer,
  nodal: NodalsReducer,
  modal: ModalReducer,
  map: MapReducer,
  mapBaseLayer: MapBaseLayerReducer,
  mapLayers: MapLayersReducer,
  markers: MarkersReducer,
  user: UserReducer,
  information: InformationReducer,
  informationSections: InformationSectionsReducer,
  drawings: DrawingReducer,
  readOnly: ReadOnlyReducer,
  save: SaveReducer,
  myMaps: MyMapsReducer,
  mapMeta: MapMetaReducer,
  share: ShareReducer,
  forSale: ForSaleReducer,
  communityAssets: CommunityAssetsReducer,
  landOwnership: LandOwnershipReducer,
});
