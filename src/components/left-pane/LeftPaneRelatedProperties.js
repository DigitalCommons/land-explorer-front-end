import React, { useState } from "react";
import LeftPaneTray from "./LeftPaneTray";
import { useSelector, useDispatch } from "react-redux";
import RelatedProperties from "./RelatedProperties";
import Pagination from "../common/Pagination";

const LeftPaneRelatedProperties = ({ onClose, open, itemsPerPage, active }) => {
  const dispatch = useDispatch();

  const otherProperties = useSelector(
    (state) => state.relatedProperties.properties
  );

  const proprietorName = useSelector(
    (state) => state.relatedProperties.proprietorName
  );

  // Set loading state
  const loading = useSelector((state) => state.relatedProperties.loading);

  const [activeProperty, setActiveProperty] = useState(null);
  // Use a Set to store unique properties
  const uniqueProperties = new Set();

  // Filter out duplicates and store unique properties
  const filteredProperties = otherProperties.filter((property) => {
    const isDuplicate = uniqueProperties.has(property.title_no);
    uniqueProperties.add(property.title_no);
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

  const openTray = (tray) => {
    active === tray
      ? dispatch({ type: "CLOSE_TRAY" })
      : dispatch({ type: "SET_ACTIVE", payload: tray });
  };

  // Clear the properties array
  const clearProperties = () => {
    setActiveProperty(null);
    dispatch({ type: "CLEAR_PROPERTIES_AND_PROPRIETOR_NAME" });
    openTray("Land Information");
  };

  // Pass down the active property to the RelatedProperties component
  const handlePropertyClick = (property) => {
    setActiveProperty(property);
  };

  const clearSearch = (
    <div className="clear-search">
      <a href="#" onClick={clearProperties}>
        Clear Properties
      </a>
    </div>
  );

  return (
    <LeftPaneTray
      title="Ownership Search"
      open={open}
      onClose={onClose}
      header={clearSearch}
    >
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
                {proprietorName}
              </span>{" "}
              has{" "}
              <span className="property-count--highlight">{propertyCount}</span>{" "}
              associated properties
            </div>
            {currentProperties.map((property, i) => (
              <RelatedProperties
                key={property.title_no}
                property={property}
                isActive={property === activeProperty}
                onPropertyClick={() => handlePropertyClick(property)}
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
      </div>
    </LeftPaneTray>
  );
};

export default LeftPaneRelatedProperties;
