import React, { useState } from "react";
import LeftPaneTray from "./LeftPaneTray";
import { useSelector, useDispatch } from "react-redux";
import RelatedProperty from "./RelatedProperty";
import Pagination from "../common/Pagination";
import {
  clearHighlightedProperties,
  fetchRelatedProperties,
  highlightProperties,
} from "../../actions/LandOwnershipActions";

const LeftPaneRelatedProperties = ({ onClose, open, itemsPerPage }) => {
  const {
    relatedProperties: properties,
    relatedPropertiesError: error,
    relatedPropertiesProprietorName: proprietorName,
    relatedPropertiesLoading: loading,
  } = useSelector((state) => state.landOwnership);

  const dispatch = useDispatch();

  const propertyCount = Object.keys(properties).length;

  // Chop up the properties into pages
  const [currentPage, setCurrentPage] = useState(1);
  const noOfPages = Math.ceil(propertyCount / itemsPerPage);
  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const propertiesOnThisPage = Object.values(properties).slice(
    indexOfFirstProperty,
    indexOfLastProperty,
  );

  const selectAll = () => {
    dispatch(highlightProperties(properties));
  };

  const clearAll = () => {
    dispatch(clearHighlightedProperties(Object.keys(properties)));
  };

  const handleRetrySearch = () => {
    dispatch(fetchRelatedProperties(proprietorName));
  };

  const highlightedProperties = useSelector(
    (state) => state.landOwnership.highlightedProperties,
  );

  const hasHighlightedProperties = propertiesOnThisPage.some(
    (property) => highlightedProperties[property.title_no],
  );

  return (
    <LeftPaneTray title="Ownership Search" open={open} onClose={onClose}>
      <div className="search-results-container">
        {loading ? (
          <div style={{ width: "100%", margin: "50px 0", textAlign: "center" }}>
            <div className="loading-spinner"></div>
          </div>
        ) : error ? (
          <>
            <div
              style={{ width: "100%", margin: "24px 0", textAlign: "center" }}
            >
              We've experienced an error. Please try again.
            </div>
            {proprietorName && (
              <div className="search-results__retry">
                <button
                  className="button-new blue full-width"
                  onClick={handleRetrySearch}
                >
                  Retry search
                </button>
              </div>
            )}
          </>
        ) : propertyCount > 0 ? (
          <>
            <div className="property-count">
              <div className="property-count--highlight">
                {propertiesOnThisPage[0].proprietor_name_1}
              </div>
              <div>
                <span className="property-count--highlight">
                  {propertyCount}
                </span>{" "}
                associated properties
              </div>
            </div>
            <div className="search-results__button-container">
              <button onClick={selectAll} className="button">
                Select all
              </button>
              {hasHighlightedProperties && (
                <p onClick={clearAll} className="clear-all">
                  Clear all
                </p>
              )}
            </div>
            {propertiesOnThisPage.map((property) => (
              <RelatedProperty key={property.title_no} property={property} />
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
          <div style={{ width: "100%", margin: "24px 0", textAlign: "center" }}>
            No Related Properties
          </div>
        )}
        <div className="property-details-section__small-print">
          <p className="small-print-margin">
            Information produced by HM Land Registry.
            <br />
            © Crown copyright 2020
            <br />
            Some data is displayed here for evaluation purposes only. For more
            information{" "}
            <a
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
