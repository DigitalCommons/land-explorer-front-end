import React from "react";
import formatProprietorName from "../../../../utils/formatProprietorName";
import { isMobile } from "react-device-detect";

type Props = {
  showInitialSearchMessage: any;
  showProprietors: any;
  showLocations: any;
  loadingProprietors: any;
  proprietorResults: any;
  locationResults: any;
  showNoProprietorsMessage: any;
  showNoLocationsMessage: any;
  hasPreviousProprietorResults: any;
  hasNextProprietorResults: any;
  onShowPreviousProprietors: any;
  onShowNextProprietors: any;
  onShowProprietors: any;
  onShowLocations: any;
  onSelectProprietor: any;
  onSelectLocation: any;
};

const SearchDropdown = ({
  showInitialSearchMessage,
  showProprietors,
  showLocations,
  loadingProprietors,
  proprietorResults,
  locationResults,
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
}: Props) => {
  return (
    <div className="search-dropdown">
      {showInitialSearchMessage ? (
        <div className="search-dropdown__empty">
          Try part of a name or place — we'll suggest matches
        </div>
      ) : (
        <>
          {/* Mobile filters */}
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

              {loadingProprietors && proprietorResults.length === 0 && (
                <div className="search-dropdown__empty">
                  Searching proprietors…
                </div>
              )}

              {showNoProprietorsMessage && (
                <div className="search-dropdown__empty">
                  No proprietors found
                </div>
              )}

              {proprietorResults.map((proprietor: any) => (
                <button
                  key={proprietor.id || proprietor.proprietorName}
                  type="button"
                  className="search-dropdown__item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    onSelectProprietor(proprietor);
                    e.currentTarget.blur();
                  }}
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

              {locationResults.map((location: any) => (
                <button
                  key={location.mapbox_id || location.place_name}
                  type="button"
                  className="search-dropdown__item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    onSelectLocation(location);
                    e.currentTarget.blur();
                  }}
                >
                  {location.name}
                  {location.place_formatted
                    ? `, ${location.place_formatted}`
                    : ""}
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