import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveProperty,
  clearHighlightedProperties,
} from "../../../actions/LandOwnershipActions";
import PropertySectionHeader from "./property-section-header/PropertySectionHeader";
import OverviewDetails from "./overview-details/OverviewDetails";
import OwnershipDetails from "./ownership-details/OwnershipDetails";
import PropertySectionSmallPrint from "./property-section-small-print/PropertySectionSmallPrint";
import * as turf from "@turf/turf";

const PropertySection = ({ property, active }) => {
  const dispatch = useDispatch();
  const { activePropertyId, relatedPropertiesProprietorName } = useSelector(
    (state) => state.landOwnership
  );

  const {
    poly_id,
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
    geom,
    date_proprietor_added,
  } = property;

  // calculate area and perimeter
  const area = Math.round(turf.area(geom));
  const perimeter = Math.round(turf.length(geom, {units: "meters"}));

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

  const proprietorCount = proprietors.length;

  const handleClear = () => {
    dispatch(clearHighlightedProperties([poly_id]));
    // Clear related properties pane if the property being cleared is the searched property
    if (property.proprietor_name_1 === relatedPropertiesProprietorName) {
      dispatch({ type: "CLEAR_RELATED_PROPERTIES_AND_PROPRIETOR_NAME" });
    }
    console.log("handleClear Property", property);
  };

  const open = poly_id === activePropertyId;

  return (
    <div className="left-pane-tray-section">
      <div
        className="left-pane-tray-section-title property-section"
        onClick={() => {
          if (open) {
            dispatch({ type: "CLEAR_ACTIVE_PROPERTY" });
          } else {
            dispatch(setActiveProperty(poly_id));
          }
        }}
      >
        <PropertySectionHeader
          address={property_address}
          polyId={poly_id}
          titleNo={title_no}
          onClickRemove={handleClear}
          open={open}
        />
      </div>
      {open && (
        <div className="property-details">
          <OverviewDetails
            address={property_address}
            area={area}
            perimeter={perimeter}
            inspireId={poly_id}
          />
          {proprietor_category_1 && (
            <>
              <OwnershipDetails
                proprietors={proprietors}
                tenure={tenure}
                dateAdded={date_proprietor_added}
                active={active}
              />
            </>
          )}

          <PropertySectionSmallPrint
            proprietor={proprietor_name_1}
            inspireId={poly_id}
            titleNo={title_no}
          />
        </div>
      )}
    </div>
  );
};

export default PropertySection;
