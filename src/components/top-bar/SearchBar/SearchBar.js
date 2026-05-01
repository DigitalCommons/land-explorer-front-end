import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";
import { isMobile } from "react-device-detect";
import constants from "../../../constants";
import useClickOutside from "../../../hooks/useClickOutside";
import useDebounce from "../../../hooks/useDebounce";
import {
  setSearchMarker,
  clearSearchMarker,
  setLngLat,
} from "../../../actions/MapActions";
import {
  fetchProprietors,
  fetchProprietorPage,
  setDropdownOpen,
  clearSearchResults,
  setSearchQuery,
  toggleSearchFilter,
  setSearchFilter,
  selectProprietorResult
} from "../../../actions/SearchActions";
import SearchDropdown from "./SearchDropDown/SearchDropDown";
import formatProprietorName from "../../../utils/formatProprietorName";

const SearchBar = ({ expanded, setExpanded }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
 const searchBoxRef = useRef(
   new SearchBoxCore({
     accessToken: constants.GEOCODER_TOKEN,
     country: "gb",
     limit: 5,
     types:
       "region,postcode,district,place,locality,neighborhood,street,address",
     proximity: null,
   }),
 );
  const sessionTokenRef = useRef(new SessionToken());
  const suppressLocationResultsRef = useRef(false);
  const [locationResults, setLocationResults] = useState([]);

  const {
    query,
    isDropdownOpen,
    activeFilter,
    proprietorResults,
    resultCounts,
    loadingProprietors,
  } = useSelector((state) => state.search);

  const debouncedQuery = useDebounce(query, 400);

  const showProprietors =
    activeFilter === null || activeFilter === "proprietor";
  const showLocations = activeFilter === null || activeFilter === "location";

  const proprietorPage = resultCounts?.proprietors?.page || 1;
  const proprietorPageSize = resultCounts?.proprietors?.pageSize || 10;
  const proprietorTotal = resultCounts?.proprietors?.total || 0;

  const hasPreviousProprietorResults =
    activeFilter === "proprietor" && proprietorPage > 1;

  const hasNextProprietorResults =
    activeFilter === "proprietor" &&
    proprietorPage * proprietorPageSize < proprietorTotal;

  const expand = (e) => {
    if (e?.target?.closest(".search-dropdown")) return;

    if (!expanded) {
      setExpanded(true);
    }

    if (query.trim() !== "") {
      dispatch(setDropdownOpen(true));
    }
  };

  const collapse = () => {
    if (!expanded) return;
    setExpanded(false);
    document.activeElement.blur();
  };

  const clearSearch = useCallback(() => {
    dispatch(clearSearchMarker());
    dispatch(setSearchQuery(""));
    dispatch(clearSearchResults());
    dispatch(setSearchFilter(null));
    setLocationResults([]);
  }, [dispatch]);

  const handleLocationSelect = async (location) => {
    const { features } = await searchBoxRef.current.retrieve(location, {
      sessionToken: sessionTokenRef.current,
    });

    sessionTokenRef.current = new SessionToken();

    const coordinates = features?.[0]?.geometry?.coordinates;
    const placeName =
      features?.[0]?.properties?.full_address ||
      features?.[0]?.properties?.place_formatted ||
      location?.name ||
      "";
  
    suppressLocationResultsRef.current = true;
    
    dispatch(setSearchQuery(placeName));
    dispatch(setSearchFilter(null));
    dispatch(setDropdownOpen(false));

    if (Array.isArray(coordinates) && coordinates.length === 2) {
      dispatch(setSearchMarker(coordinates[0], coordinates[1]));
      dispatch(setLngLat(coordinates[0], coordinates[1]));
    }
    
    document.activeElement.blur();
  };

  const handleProprietorSelect = async (proprietor) => {
    const proprietorName =
      typeof proprietor === "string"
        ? proprietor
        : proprietor?.proprietorName || "";

    const formattedName = formatProprietorName(proprietorName);

    if (formattedName) {
      suppressLocationResultsRef.current = true;
      dispatch(setSearchQuery(formattedName));
    }

    dispatch(setDropdownOpen(false));
    await dispatch(selectProprietorResult(proprietor));
    document.activeElement.blur();
  };

  const handleClearSearch = (e) => {
    e.stopPropagation();
    clearSearch();
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setLocationResults([]);
      return;
    }

    if (suppressLocationResultsRef.current) {
      suppressLocationResultsRef.current = false;
      return;
    }

    dispatch(fetchProprietors(debouncedQuery));

    const fetchSuggestions = async () => {
      const response = await searchBoxRef.current.suggest(debouncedQuery, {
        sessionToken: sessionTokenRef.current,
      });
      setLocationResults(response?.suggestions || []);
    };

    fetchSuggestions();
  }, [debouncedQuery, dispatch]);

  useClickOutside(ref, () => {
    dispatch(setDropdownOpen(false));
    if (isMobile) collapse();
  });

  const hasQuery = query.trim().length > 0;

  const showNoProprietorsMessage =
    showProprietors &&
    !loadingProprietors &&
    hasQuery &&
    proprietorResults.length === 0;

  const showNoLocationsMessage =
    showLocations && hasQuery && locationResults.length === 0;

 const showInitialSearchMessage = isDropdownOpen && !hasQuery;

  return (
    <div
      ref={ref}
      className="search-bar-container"
      onClick={expand}
    >
      
      <div className={`mapboxgl-ctrl-geocoder ${expanded ? "geocoder-expanded" : "geocoder-collapsed"}`}>
        <input
          className="mapboxgl-ctrl-geocoder--input"
          type="text"
          placeholder="Search by proprietor, address or location"
          value={query}
          onChange={(e) => {
            const nextQuery = e.target.value;
            dispatch(setSearchQuery(nextQuery));

            if (!nextQuery.trim()) {
              dispatch(clearSearchResults());
              dispatch(setSearchFilter(null));
              dispatch(setDropdownOpen(false));
              return;
            }

            dispatch(setDropdownOpen(true));
          }}
          onFocus={() => dispatch(setDropdownOpen(true))}
        />
        </div>
      <div className="search-bar-buttons">
        {hasQuery && (
          <button
            type="button"
            className="search-clear-button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClearSearch}
            aria-label="Clear search"
          />
        )}

        <span className="search-bar-buttons__divider" />

        <button
          type="button"
          className={`search-filter-icon-button ${activeFilter === "proprietor" ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleSearchFilter("proprietor"));
          }}
          aria-label="Filter by proprietors"
        >
          <span className="search-filter-icon search-filter-icon--proprietor" />
        </button>

        <button
          type="button"
          className={`search-filter-icon-button ${activeFilter === "location" ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleSearchFilter("location"));
          }}
          aria-label="Filter by locations"
        >
          <span className="search-filter-icon search-filter-icon--location" />
        </button>
      </div>

      {isDropdownOpen && (
        <SearchDropdown
          showInitialSearchMessage={showInitialSearchMessage}
          showProprietors={showProprietors}
          showLocations={showLocations}
          loadingProprietors={loadingProprietors}
          proprietorResults={proprietorResults}
          locationResults={locationResults}
          showNoProprietorsMessage={showNoProprietorsMessage}
          showNoLocationsMessage={showNoLocationsMessage}
          hasPreviousProprietorResults={hasPreviousProprietorResults}
          hasNextProprietorResults={hasNextProprietorResults}
          onShowProprietors={() => dispatch(toggleSearchFilter("proprietor"))}
          onShowLocations={() => dispatch(toggleSearchFilter("location"))}
          onShowPreviousProprietors={() =>
            dispatch(fetchProprietorPage(proprietorPage - 1))
          }
          onShowNextProprietors={() =>
            dispatch(fetchProprietorPage(proprietorPage + 1))
          }
          onSelectProprietor={handleProprietorSelect}
          onSelectLocation={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default SearchBar;
