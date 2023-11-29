import React, { useState } from "react";
import LeftPaneTray from "./LeftPaneTray";
import { useSelector } from "react-redux";
import RelatedProperties from "./RelatedProperties";
import Pagination from "../common/Pagination";

const LeftPaneRelatedProperties = ({ onClose, open, itemsPerPage }) => {
  const otherProperties = useSelector(
    (state) => state.relatedProperties.properties
  );

  // Set loading state
  const loading = useSelector((state) => state.relatedProperties.loading);

  // Move to nested component - to allow multiple properties to be selected
  // const [activeProperty, setActiveProperty] = useState(null);

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

  // Remove this function and move to nested component
  // Pass down the active property to the RelatedProperties component
  // const handlePropertyClick = (property) => {
  //   setActiveProperty(property);
  // };

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
