import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveProperty } from "../../actions/LandOwnershipActions";
import Button from "../common/Button";
import { getRelatedProperties } from "../../actions/LandOwnershipActions";
import { isMobile } from "react-device-detect";

const PropertySection = ({ property, active }) => {
  const dispatch = useDispatch();
  const activePropertyId = useSelector(
    (state) => state.landOwnership.activePropertyId
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
    dispatch(getRelatedProperties(proprietor_name_1));
    openTray("Ownership Search");
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
        <div
          style={{
            height: "auto",
            padding: "12px 24px",
            borderBottom: "1px solid #ccc",
            background: "#78838f",
            color: "white",
          }}
        >
          {proprietor_category_1 && (
            <>
              <p>Property Address: {property_address}</p>
              <p>Proprietor Category: {proprietor_category_1}</p>
              <p>Proprietor Name: {proprietor_name_1}</p>
              <p>Proprietor Address: {proprietor_1_address_1}</p>
              <p>Tenure: {tenure}</p>
              <p>Date Proprietor Added: {date_proprietor_added}</p>
              <span className="horizontal-divider" />
            </>
          )}
          <p title="The Title Register gives information on who owns the property or land, and any rights of way">
            <b>INSPIRE ID:</b> {poly_id}
          </p>
          <p title="The Title Plan includes the property or land's location and boundaries">
            <b>Title number:</b> {title_no}
          </p>
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
          <button
            onClick={() =>
              dispatch({
                type: "CLEAR_HIGHLIGHT",
                payload: property,
              })
            }
          >
            Clear property
          </button>

          <div className="check-for-properties">
            <Button
              buttonClass={"button-new"}
              type={"button"}
              buttonAction={handleSearch}
            >
              Check for other properties
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySection;
