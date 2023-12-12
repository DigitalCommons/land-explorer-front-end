import React, { useState } from "react";
import LeftPaneTray from "./LeftPaneTray";
import { useSelector, useDispatch } from "react-redux";
import RelatedProperties from "./RelatedProperties";
import Pagination from "../common/Pagination";
import { clearAllSelectedProperties, selectRelatedProperties } from "../../actions/LandOwnershipActions";

const LeftPaneRelatedProperties = ({ onClose, open, itemsPerPage }) => {
  const properties = useSelector((state) => state.relatedProperties.properties);
  const dispatch = useDispatch();

  // Set loading state
  const loading = useSelector((state) => state.relatedProperties.loading);

  // Move to nested component - to allow multiple properties to be selected
  // const [activeProperty, setActiveProperty] = useState(null);

  // Our related properties is a collection of polygons. Multiple polygons can have the same title
  // number. We want to show a list of unique titles in the left pane, so let's filter our
  // collection to have at most 1 polygon for each title.
  // TODO: we should improve this so that selecting a title selects all of its corresponding property
  // polygons. Currently, we're losing data for additional polgyons, so the user doesn't see them
  // highlighted. https://github.com/DigitalCommons/land-explorer-front-end/issues/296 

  // Use a Set to temporarily store unique property title numers
  const uniqueTitleNos = new Set();

  const filteredProperties = Object.values(properties).filter((property) => {
    const isDuplicate = uniqueTitleNos.has(property.title_no);
    uniqueTitleNos.add(property.title_no);
    return !isDuplicate;
  });

  const propertyCount = filteredProperties.length;

  // Pagination values
  const [currentPage, setCurrentPage] = useState(1);
  const noOfPages = Math.ceil(propertyCount / itemsPerPage);
  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  // Chop up the properties array into pages
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const selectAll = () => {
    dispatch(selectRelatedProperties(properties));
  }
  const clearAll = () => {
    dispatch(clearAllSelectedProperties());
  }

  return (
    <LeftPaneTray title="Ownership Search" open={open} onClose={onClose}>
      <div className="search-results-container">
        {loading ? (
          <div
            style={{ width: "100%", marginTop: "50px", textAlign: "center" }}
          >
            <div className="loading-spinner"></div>
          </div>
        ) : filteredProperties.length ? (
          <>
            <div className="property-count">
              <span className="property-count--highlight">
                {currentProperties[0].proprietor_name_1 &&
                  currentProperties[0].proprietor_name_1}
              </span>{" "}
              has{" "}
              <span className="property-count--highlight">{propertyCount}</span>{" "}
              associated properties
            </div>
            {/*<p onClick={selectAll} className="clear-all">Select all</p>*/}
            <p onClick={clearAll} className="clear-all">Clear all</p>
            {currentProperties.map((property, i) => (
              <RelatedProperties
                key={property.title_no}
                property={property}
              // isActive={property === activeProperty}
              // onPropertyClick={() => handlePropertyClick(property)}
              />
            ))}
            {noOfPages > 1 && (
              <Pagination
                pagesDisplayed={5}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                noOfPages={noOfPages}
                itemsPerPage={itemsPerPage}
              />
            )}
          </>
        ) : (
          <div
            style={{ width: "100%", marginTop: "24px", textAlign: "center" }}
          >
            No Related Properties
          </div>
        )}
        <div className="property-details-section__small-print">
          <p className="small-print-margin">
            Information produced by HM Land Registry.
            <br />
            © Crown copyright 2020
            <br />
            Some data is displayed here for evaluation purposes only. For more information
            {" "}<a
              href="https://landexplorer.coop/land-ownership-how"
              target="_blank"
              rel="noopener noreferrer"
            >
              click here
            </a>
          </p>
        </div>
      </div>
    </LeftPaneTray>
  );
};

export default LeftPaneRelatedProperties;
