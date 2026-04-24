import React from "react";
import formatProprietorName from "../../../../utils/formatProprietorName";

const SearchDropdown = ({
  showProprietors,
  showLocations,
  loadingProprietors,
  visibleProprietorResults,
  visibleLocationResults,
  showNoProprietorsMessage,
  showNoLocationsMessage,
  onShowAll,
  onShowProprietors,
  onShowLocations,
  onSelectProprietor,
  onSelectLocation,
}) => {
  return (
    <div className="search-dropdown">
      <div className="search-dropdown__filters">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onShowAll}
        >
          All
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onShowProprietors}
        >
          Proprietors
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onShowLocations}
        >
          Locations
        </button>
      </div>

      {showProprietors && (
        <div className="search-dropdown__group">
          <div className="search-dropdown__heading">Proprietors</div>

          {loadingProprietors && visibleProprietorResults.length === 0 && (
            <div className="search-dropdown__empty">Searching owners…</div>
          )}

          {showNoProprietorsMessage && (
            <div className="search-dropdown__empty">No proprietors found</div>
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
        </div>
      )}

      {showLocations && (
        <div className="search-dropdown__group">
          <div className="search-dropdown__heading">Locations</div>

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
    </div>
  );
};

export default SearchDropdown;
