import React from "react";
import formatProprietorName from "../../../../utils/formatProprietorName";
import { isMobile } from "react-device-detect";

const SearchDropdown = ({
  showInitialSearchMessage,
  showProprietors,
  showLocations,
  loadingProprietors,
  visibleProprietorResults,
  visibleLocationResults,
  showNoProprietorsMessage,
  showNoLocationsMessage,
  hasPreviousProprietorResults,
  hasNextProprietorResults,
  onShowPreviousProprietors,
  onShowNextProprietors,
  onShowProprietors,
  onShowLocations,
  onSelectProprietor,
  onSelectLocation,
}) => {
  return (
    <div className="search-dropdown">
      {showInitialSearchMessage ? (
        <div className="search-dropdown__empty">
          Try part of a name or place — we'll suggest matches
        </div>
      ) : (
        <>
          {/* Filter buttons - mobile only */}
          <div className="search-dropdown__filters">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={onShowProprietors}
              className={showProprietors && !showLocations ? "selected" : ""}
            >
              Proprietors
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={onShowLocations}
              className={showLocations && !showProprietors ? "selected" : ""}
            >
              Locations
            </button>
          </div>

          {showProprietors && (
            <div className="search-dropdown__group">
              <div className="search-dropdown__heading">
                <span className="search-filter-icon search-filter-icon--proprietor" />
                Proprietors
              </div>

              {loadingProprietors && visibleProprietorResults.length === 0 && (
                <div className="search-dropdown__empty">
                  Searching proprietors…
                </div>
              )}

              {showNoProprietorsMessage && (
                <div className="search-dropdown__empty">
                  No proprietors found
                </div>
              )}

              {visibleProprietorResults.map((proprietor) => (
                <button
                  key={proprietor.id || proprietor.proprietorName}
                  type="button"
                  className="search-dropdown__item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSelectProprietor(proprietor)}
                >
                  {formatProprietorName(proprietor.proprietorName)}
                </button>
              ))}

              {(hasPreviousProprietorResults || hasNextProprietorResults) && (
                <div className="search-dropdown__pagination">
                  {hasPreviousProprietorResults && (
                    <button
                      type="button"
                      className="rounded-button-outline"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={onShowPreviousProprietors}
                      disabled={loadingProprietors}
                    >
                      Previous {!isMobile && "10 matches"}
                    </button>
                  )}

                  {hasNextProprietorResults && (
                    <button
                      type="button"
                      className="rounded-button-outline"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={onShowNextProprietors}
                      disabled={loadingProprietors}
                    >
                      {loadingProprietors
                        ? "Loading…"
                        : `Next ${!isMobile ? "10 matches" : ""}`}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {showLocations && (
            <div className="search-dropdown__group">
              <div className="search-dropdown__heading">
                <span className="search-filter-icon search-filter-icon--location" />
                Locations
              </div>

              {showNoLocationsMessage && (
                <div className="search-dropdown__empty">No locations found</div>
              )}

              {visibleLocationResults.map((location) => (
                <button
                  key={location.id || location.place_name}
                  type="button"
                  className="search-dropdown__item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSelectLocation(location)}
                >
                  {location.place_name}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchDropdown;
