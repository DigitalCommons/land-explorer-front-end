import React, { useState } from "react";
import LeftPaneTray from "./LeftPaneTray";
import { useSelector } from "react-redux";
import RelatedProperties from "./RelatedProperties";

const LeftPaneRelatedProperties = ({ onClose, open, itemsPerPage }) => {
  const otherProperties = useSelector(
    (state) => state.relatedProperties.properties
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Use a Set to store unique properties
  const uniqueProperties = new Set();

  // Filter out duplicates and store unique properties
  const filteredProperties = otherProperties.filter((property) => {
    const isDuplicate = uniqueProperties.has(property.title_no);
    uniqueProperties.add(property.title_no);
    return !isDuplicate;
  });

  const propertyCount = filteredProperties.length;

  // Pagination
  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const noOfPages = Math.ceil(propertyCount / itemsPerPage);
  const pageNumbers = [...Array(noOfPages + 1).keys()].slice(1);
  const lastPage = pageNumbers[pageNumbers.length - 1];
  const firstPage = pageNumbers[0];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < noOfPages) {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  console.log("Items per page: ", itemsPerPage);
  console.log("first Page: ", firstPage);
  console.log("last Page: ", lastPage);

  return (
    <LeftPaneTray title="Ownership Search" open={open} onClose={onClose}>
      {filteredProperties.length ? (
        <>
          <div>{propertyCount} properties</div>
          {currentProperties.map((property, i) => (
            <RelatedProperties key={property.title_no} property={property} />
          ))}
          <div className="pagination">
            {noOfPages > 1 && (
              <nav>
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={previousPage}
                      disabled={currentPage === firstPage}
                    >
                      Prev
                    </button>
                  </li>
                  {pageNumbers.length > maxPageNumberLimit &&
                    currentPage > 5 && (
                      <li className="ellipsis page-item" onClick={previousPage}>
                        &hellip;
                      </li>
                    )}
                  {pageNumbers.map((number) => {
                    if (
                      number < maxPageNumberLimit + 1 &&
                      number > minPageNumberLimit
                    ) {
                      return (
                        <li key={number} className="page-item" id={number}>
                          <button
                            onClick={() => paginate(number)}
                            className={`page-link ${
                              currentPage === number ? "active" : null
                            }`}
                          >
                            {number}
                          </button>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                  {pageNumbers.length > maxPageNumberLimit &&
                    currentPage != lastPage && (
                      <li className="ellipsis page-item" onClick={nextPage}>
                        &hellip;
                      </li>
                    )}
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={nextPage}
                      disabled={currentPage === lastPage}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </>
      ) : (
        <div>No Related Properties</div>
      )}
    </LeftPaneTray>
  );
};

export default LeftPaneRelatedProperties;
