import React from "react";
import LeftPaneTray from "./LeftPaneTray";
import { useSelector } from "react-redux";
import RelatedProperties from "./RelatedProperties";

const LeftPaneRelatedProperties = ({ onClose, open, itemsPerPage }) => {
  const otherProperties = useSelector(
    (state) => state.relatedProperties.properties
  );

  const [currentPage, setCurrentPage] = React.useState(1);

  // Use a Set to store unique properties
  const uniqueProperties = new Set();

  // Filter out duplicates and store unique properties
  const filteredProperties = otherProperties.filter((property) => {
    const isDuplicate = uniqueProperties.has(property.title_no);
    uniqueProperties.add(property.title_no);
    return !isDuplicate;
  });

  const propertyCount = filteredProperties.length;

  // Index range for pagination
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
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  console.log("Items per page: ", itemsPerPage);
  console.log("first Page: ", firstPage);
  console.log("last Page: ", lastPage);

  return (
    <LeftPaneTray title="Related Properties" open={open} onClose={onClose}>
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
                      Previous
                    </button>
                  </li>
                  {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                      <button
                        onClick={() => paginate(number)}
                        className={`page-link ${
                          currentPage === number ? "active" : ""
                        }`}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
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
        <div>No related Properties</div>
      )}
    </LeftPaneTray>
  );
};

export default LeftPaneRelatedProperties;
