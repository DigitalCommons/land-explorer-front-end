import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import {
  setActiveProperty,
  clearHighlightedProperties,
} from "../../../actions/LandOwnershipActions";
import PropertySectionHeader from "./property-section-header/PropertySectionHeader";
import OverviewDetails from "./overview-details/OverviewDetails";
import OwnershipDetails from "./ownership-details/OwnershipDetails";
import * as turf from "@turf/turf";
import { Property } from "@/reducers/LandOwnershipReducer";

type Props = {
  property: Property;
};

const PropertySection = ({ property }: Props) => {
  const dispatch = useAppDispatch();
  const { activePropertyTitleNo, relatedPropertiesProprietorName } =
    useAppSelector((state) => state.landOwnership);

  const {
    title_no,
    property_address,
    proprietor_name_1,
    proprietor_name_2,
    proprietor_name_3,
    proprietor_name_4,
    proprietor_1_address_1,
    proprietor_2_address_1,
    proprietor_3_address_1,
    proprietor_4_address_1,
    proprietor_category_1,
    proprietor_category_2,
    proprietor_category_3,
    proprietor_category_4,
    tenure,
    date_proprietor_added,
    polygons,
  } = property;

  // calculate total area and perimeter
  const area = Math.round(
    polygons
      .map((polygon) => turf.area(polygon.geom))
      .reduce((a, b) => a + b, 0),
  );
  const perimeter = Math.round(
    polygons
      .flatMap((polygon) =>
        turf
          .flatten(turf.polygonToLine(polygon.geom))
          .features.map((line) => turf.length(line, { units: "meters" })),
      )
      .reduce((a, b) => a + b, 0),
  );

  const proprietors = [
    {
      name: proprietor_name_1,
      address: proprietor_1_address_1,
      category: proprietor_category_1,
      number: "One",
    },
    {
      name: proprietor_name_2,
      address: proprietor_2_address_1,
      category: proprietor_category_2,
      number: "Two",
    },
    {
      name: proprietor_name_3,
      address: proprietor_3_address_1,
      category: proprietor_category_3,
      number: "Three",
    },
    {
      name: proprietor_name_4,
      address: proprietor_4_address_1,
      category: proprietor_category_4,
      number: "Four",
    },
  ].filter((proprietor) => proprietor.name);

  const handleClear = () => {
    dispatch(clearHighlightedProperties([title_no]));
    // Clear related properties pane if the property being cleared is the searched property
    if (property.proprietor_name_1 === relatedPropertiesProprietorName) {
      dispatch({ type: "CLEAR_RELATED_PROPERTIES_AND_PROPRIETOR_NAME" });
    }
    console.log("handleClear Property", property);
  };

  const open = title_no === activePropertyTitleNo;
  const freehold = tenure?.toLowerCase() === "freehold";

  return (
    <div className="left-pane-tray-section">
      <div
        className="left-pane-tray-section-title property-section"
        onClick={() => {
          if (open) {
            dispatch({ type: "CLEAR_ACTIVE_PROPERTY" });
          } else {
            dispatch(setActiveProperty(title_no));
          }
        }}
      >
        <PropertySectionHeader
          address={property_address}
          title_no={title_no}
          onClickRemove={handleClear}
          open={open}
          unregistered={tenure === "unregistered"}
        />
      </div>
      {open && (
        <div className="property-details">
          <OverviewDetails
            address={property_address}
            area={area}
            perimeter={perimeter}
            polyIds={polygons.map((polygon) => polygon.poly_id)}
            unregistered={tenure === "unregistered"}
            freehold={freehold}
          />
          <OwnershipDetails
            title_no={title_no}
            proprietors={proprietors}
            tenure={tenure}
            dateAdded={date_proprietor_added}
          />
        </div>
      )}
    </div>
  );
};

export default PropertySection;
