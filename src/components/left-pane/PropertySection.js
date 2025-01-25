import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveProperty,
  clearHighlightedProperties,
} from "../../actions/LandOwnershipActions";
import Button from "../common/Button";
import { fetchRelatedProperties } from "../../actions/LandOwnershipActions";

const PropertySection = ({ property, active }) => {
  const dispatch = useDispatch();
  const { activePropertyId, relatedPropertiesProprietorName } = useSelector(
    (state) => state.landOwnership
  );

  const {
    poly_id,
    title_no,
    proprietor_category_1,
    property_address,
    proprietor_name_1,
    proprietor_1_address_1,
    tenure,
    date_proprietor_added,
  } = property;

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
        <h4
          style={{
            marginLeft: "48px",
            fontWeight: "bold",
            width: "140px",
          }}
        >
          Property {poly_id}
        </h4>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "12px",
            width: "24px",
            height: "24px",
            textAlign: "center",
          }}
        >
          <img
            src={require("../../assets/img/icon-chevron.svg")}
            alt=""
            style={{
              transformOrigin: "center",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </div>
      {open && (
        <div className="property-details">
          {proprietor_category_1 && (
            <>
              <div className="property-details-title">{property_address}</div>
              <div className="property-details-section">
                <div className="property-details-section__title">
                  Proprietor Name:
                </div>
                <div className="property-details-section__value">
                  {proprietor_name_1}
                </div>
              </div>
              <div className="property-details-section">
                <div className="property-details-section__title">
                  Proprietor Address:
                </div>
                <div className="property-details-section__value">
                  {proprietor_1_address_1}
                </div>
              </div>
              <div className="property-details-section">
                <div className="property-details-section__inner">
                  <div className="property-details-section__title">
                    Proprietor Category:
                  </div>
                  <div className="property-details-section__value">
                    {proprietor_category_1}
                  </div>
                </div>
                <div className="property-details-section__inner">
                  <div className="property-details-section__title">Tenure:</div>
                  <div className="property-details-section__value">
                    {tenure}
                  </div>
                </div>
                <div className="property-details-section__inner">
                  <div className="property-details-section__title">
                    Date Proprietor Added:
                  </div>
                  <div className="property-details-section__value">
                    {date_proprietor_added}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="property-details-section">
            <div className="property-details-section__inner">
              <div
                className="property-details-section__title"
                title="The Title Register gives information on who owns the property or land, and any rights of way"
              >
                INSPIRE ID:
              </div>
              <div className="property-details-section__value">{poly_id}</div>
            </div>
            <div
              className="property-details-section__inner"
              title="The Title Plan includes the property or land's location and boundaries"
            >
              <div className="property-details-section__title">
                Title Number:
              </div>
              <div className="property-details-section__value">{title_no}</div>
            </div>
            <div className="property-details-section__small-print">
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
