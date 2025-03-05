import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveProperty,
  clearHighlightedProperties,
} from "../../../actions/LandOwnershipActions";
import Button from "../../common/Button";
import { fetchRelatedProperties } from "../../../actions/LandOwnershipActions";
import OwnershipDetails from "./ownership-details/OwnershipDetails";

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
    date_proprietor_added,
  } = property;

  // Create an array of proprietor objects that are not empty
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

  const open = poly_id === activePropertyId;

  const openTray = (tray) => {
    active === tray
      ? dispatch({ type: "CLOSE_TRAY" })
      : dispatch({ type: "SET_ACTIVE", payload: tray });
  };

  const handleSearch = () => {
    dispatch({ type: "CLEAR_RELATED_PROPERTIES_AND_PROPRIETOR_NAME" });
    dispatch(fetchRelatedProperties(proprietor_name_1));
    openTray("Ownership Search");
  };

  const handleClear = () => {
    dispatch(clearHighlightedProperties([poly_id]));
    // Clear related properties pane if the property being cleared is the searched property
    if (property.proprietor_name_1 === relatedPropertiesProprietorName) {
      dispatch({ type: "CLEAR_RELATED_PROPERTIES_AND_PROPRIETOR_NAME" });
    }
    console.log("handleClear Property", property);
  };

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
        <div className="property-section-header">
          <h4 className="property-section-header__address">
            {property_address ? property_address : `Property ${poly_id}`}
          </h4>
          <div className="property-section-header__title-no">
            Title no: {title_no} - {proprietorCount}
          </div>
          <a className="property-section-header__remove" onClick={handleClear}>
            Remove Property
          </a>
          <div className="property-section-header__chevron">
            <img
              src={require("../../../assets/img/icon-chevron.svg")}
              alt=""
              style={{
                transformOrigin: "center",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        </div>
      </div>
      {/* Property section ends */}
      {/* {proprietor_name_2} */}
      {open && (
        <div className="property-details">
          {proprietor_category_1 && (
            <>
              <OwnershipDetails
                proprietors={proprietors}
                tenure={tenure}
                inspireId={poly_id}
                active={active}
              />
              <div className="property-details-info">
                <div className="property-details-info__title">
                  Proprietor Name:
                </div>
                <div className="property-details-info__value">
                  {proprietor_name_1}
                </div>
              </div>
              <div className="property-details-info">
                <div className="property-details-info__title">
                  Proprietor Address:
                </div>
                <div className="property-details-info__value">
                  {proprietor_1_address_1}
                </div>
              </div>
              <div className="property-details-info">
                <div className="property-details-info__inner">
                  <div className="property-details-info__title">
                    Proprietor Category:
                  </div>
                  <div className="property-details-info__value">
                    {proprietor_category_1}
                  </div>
                </div>
                <div className="property-details-info__inner">
                  <div className="property-details-info__title">Tenure:</div>
                  <div className="property-details-info__value">{tenure}</div>
                </div>
                <div className="property-details-info__inner">
                  <div className="property-details-info__title">
                    Date Proprietor Added:
                  </div>
                  <div className="property-details-info__value">
                    {date_proprietor_added}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="property-details-info">
            <div className="property-details-info__inner">
              <div
                className="property-details-info__title"
                title="The Title Register gives information on who owns the property or land, and any rights of way"
              >
                INSPIRE ID:
              </div>
              <div className="property-details-info__value">{poly_id}</div>
            </div>
            <div
              className="property-details-info__inner"
              title="The Title Plan includes the property or land's location and boundaries"
            >
              <div className="property-details-info__title">Title Number:</div>
              <div className="property-details-info__value">{title_no}</div>
            </div>
            <div className="property-details-info__small-print">
              <p>
                You can access these documents for a small fee by visiting the{" "}
                <a
                  href="https://search-property-information.service.gov.uk/search/search-by-inspire-id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Land Registry website
                </a>{" "}
                using the above IDs.
              </p>
              <p>
                Information produced by HM Land Registry. © Crown copyright
                2020. <br />
                Some data is displayed here for evaluation purposes only. For
                more information{" "}
                <a
                  target="_blank"
                  href="https://landexplorer.coop/land-ownership-how"
                >
                  click here
                </a>
              </p>
            </div>
          </div>

          {proprietor_category_1 && (
            <div className="property__check-for-properties">
              <Button
                buttonClass={"button-new green full-width"}
                type={"button"}
                buttonAction={handleSearch}
              >
                Check for other properties
              </Button>
            </div>
          )}
          <div className="property__clear-property">
            <button
              className="button-new blue full-width"
              onClick={handleClear}
            >
              Clear property
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySection;
