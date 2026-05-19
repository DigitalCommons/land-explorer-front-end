import { useState } from "react";

type Props = {
  pagesDisplayed: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  noOfPages: number;
  itemsPerPage: number;
};

const Pagination = ({
  pagesDisplayed,
  currentPage,
  setCurrentPage,
  noOfPages,
  itemsPerPage,
}: Props) => {
  const [pageNumberLimit, setPageNumberLimit] = useState(pagesDisplayed);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pagesDisplayed);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pageNumbers = [...Array(noOfPages + 1).keys()].slice(1);
  const lastPage = pageNumbers[pageNumbers.length - 1];
  const firstPage = pageNumbers[0];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
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

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className="page-item prev">
          <button
            className="page-link"
            onClick={previousPage}
            disabled={currentPage === firstPage}
          >
            Prev
          </button>
        </li>
        {pageNumbers.length > maxPageNumberLimit && currentPage > 5 && (
          <li className="ellipsis page-item" onClick={previousPage}>
            &hellip;
          </li>
        )}
        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li key={number} className="page-item" id={String(number)}>
                <button
                  onClick={() => paginate(number)}
                  className={`page-link ${currentPage === number ? "active" : null
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
          currentPage !== lastPage && (
            <li className="ellipsis page-item" onClick={nextPage}>
              &hellip;
            </li>
          )}
        <li className="page-item next">
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
  );
};

export default Pagination;
