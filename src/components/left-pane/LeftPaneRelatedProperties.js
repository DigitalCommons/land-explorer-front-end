import React, { useState } from "react";
import LeftPaneTray from "./LeftPaneTray";
import { useSelector } from "react-redux";
import RelatedProperties from "./RelatedProperties";
import Pagination from "../common/Pagination";

const LeftPaneRelatedProperties = ({ onClose, open, itemsPerPage }) => {
  const otherProperties = useSelector(
    (state) => state.relatedProperties.properties
  );

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

  return (
    <LeftPaneTray title="Ownership Search" open={open} onClose={onClose}>
      <div className="search-results-container">
        {filteredProperties.length ? (
          <>
            <div className="property-count">
              <span className="property-count--highlight">
                {currentProperties[0].proprietor_name_1}
              </span>{" "}
              has{" "}
              <span className="property-count--highlight">{propertyCount}</span>{" "}
              associated properties
            </div>
            {currentProperties.map((property, i) => (
              <RelatedProperties key={property.title_no} property={property} />
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
          <div>No Related Properties</div>
        )}
      </div>
    </LeftPaneTray>
  );
};

export default LeftPaneRelatedProperties;
