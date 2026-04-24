import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useMediaQuery } from "react-responsive";
import constants from "../../../constants";
import useClickOutside from "../../../hooks/useClickOutside";
import { setSearchMarker, clearSearchMarker, setLngLat } from "../../../actions/MapActions";
import {
  fetchProprietors,
  openSearchDropdown,
  closeSearchDropdown,
  clearSearchResults,
  setSearchQuery,
  toggleSearchFilter,
  clearSearchFilter,
  selectProprietorResult,
  selectLocationResult,
} from "../../../actions/SearchActions";
import SearchDropdown from "./SearchDropDown/SearchDropDown";

const SearchBar = ({ expanded, setExpanded }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const geocoderRef = useRef(null);
  const inputRef = useRef(null);
  const inputListenerCleanupRef = useRef(null);
  const debounceRef = useRef(null);
  const [locationResults, setLocationResults] = useState([]);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 550px)' });

  const { query, isDropdownOpen, activeFilter, proprietorResults, resultCounts, loadingProprietors } = useSelector(state => state.search);

  const visibleProprietorResults = proprietorResults.slice(0, resultCounts?.proprietors?.visible || 5);
  const visibleLocationResults = locationResults.slice(0, 5);

  const showProprietors = activeFilter === null || activeFilter === "proprietor";
  const showLocations = activeFilter === null || activeFilter === "location";

  const expand = () => {
    if (!expanded) {
      setExpanded(true);
      const geocoder = document.getElementById("search-bar").children[0];
      if (geocoder) {
        geocoder.classList.remove("geocoder-collapsed");
        geocoder.classList.add("geocoder-expanded");
      }
    }

    const geocoderInput =
      document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0]
        ?.value || "";
    
    if (geocoderInput.trim() !== "") {
      dispatch(openSearchDropdown());
    }
  };

  const collapse = () => {
    if (!expanded) return;
    setExpanded(false);
    const geocoder = document.getElementById("search-bar").children[0];
    if (!geocoder) return;

    geocoder.classList.remove("geocoder-expanded");
    geocoder.classList.add("geocoder-collapsed");
    document.activeElement.blur();
  };

  const clearLocalLocationResults = () => {
    setLocationResults([]);
  }

  const handleLocationSelect = (location) => {
    const center = location?.center;

    dispatch(selectLocationResult(location));

    if (location?.place_name && geocoderRef.current?.setInput) {
      geocoderRef.current.setInput(location.place_name);
    }

    if (Array.isArray(center) && center.length === 2) {
      dispatch(setSearchMarker(center[0], center[1]));
      dispatch(setLngLat(center[0], center[1]));
    }

    clearLocalLocationResults();
    dispatch(closeSearchDropdown());
    document.activeElement.blur();
  }

  const handleProprietorSelect = async (proprietor) => {
    clearLocalLocationResults();
    await dispatch(selectProprietorResult(proprietor));
    document.activeElement.blur();
  }

  // 
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: constants.GEOCODER_TOKEN,
      placeholder: "Search by proprietor, address or location",
      countries: "gb",
      zoom: 13,
      reverseGeocode: true,
      marker: false,
    });

    geocoderRef.current = geocoder;

    geocoder.on("results", (event) => {
      const results = event?.features || [];
      setLocationResults(results);
    });

    geocoder.on("result", (result) => {
      document.activeElement.blur();

      const center = result?.result?.center || [];
      if (center.length === 2) {
        dispatch(setSearchMarker(center[0], center[1]));
        dispatch(setLngLat(center[0], center[1]));
      }

      dispatch(
        setSearchQuery(
          result?.result?.place_name || result?.result?.text || "",
        ),
      );

      dispatch(closeSearchDropdown());
      clearLocalLocationResults();
    });

    geocoder.on("clear", () => {
      dispatch(clearSearchMarker());
      dispatch(setSearchQuery(""));
      dispatch(clearSearchResults());
      dispatch(clearSearchFilter());
      dispatch(closeSearchDropdown());
      clearLocalLocationResults();
    });

    const geocoderElement = geocoder.onAdd();
    document.getElementById("search-bar").appendChild(geocoderElement);

    const input = geocoderElement.querySelector(
      ".mapboxgl-ctrl-geocoder--input",
    );

    inputRef.current = input;

    const handleInput = (event) => {
      const nextQuery = event.target.value || "";

      dispatch(setSearchQuery(nextQuery));

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (!nextQuery.trim()) {
        dispatch(clearSearchResults());
        dispatch(clearSearchFilter());
        dispatch(closeSearchDropdown());
        clearLocalLocationResults();
        return;
      }

      dispatch(openSearchDropdown());

      debounceRef.current = setTimeout(() => {
        dispatch(fetchProprietors(nextQuery));
      }, 600);
    };

    const handleFocus = () => {
      dispatch(openSearchDropdown());
    };

    input.addEventListener("input", handleInput);
    input.addEventListener("focus", handleFocus);
    inputListenerCleanupRef.current = () => {
      input.removeEventListener("input", handleInput);
      input.removeEventListener("focus", handleFocus);
    };

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (inputListenerCleanupRef.current) {
        inputListenerCleanupRef.current();
      }

      if (geocoderRef.current) {
        geocoderRef.current.onRemove();
      }
    };
  }, [dispatch]);

  useClickOutside(ref, () => {
    dispatch(closeSearchDropdown());

    if (isSmallScreen) {
      collapse();
    }
  });

  const hasQuery = query.trim().length > 0;

  const showNoProprietorsMessage =
    showProprietors &&
    !loadingProprietors &&
    hasQuery &&
    visibleProprietorResults.length === 0;

  const showNoLocationsMessage =
    showLocations && hasQuery && visibleLocationResults.length === 0;

  const showDropdownContent = isDropdownOpen;

  const showInitialSearchMessage = isDropdownOpen && !hasQuery;


  return (
    <div ref={ref} className="search-bar-container" onClick={expand}>
      <span id="search-bar" />
      <div className="search-bar-buttons">
        <span className="search-bar-buttons__divider" />
        <button
          type="button"
          className={`search-filter-icon-button ${
            activeFilter === "proprietor" ? "is-active" : ""
          }`}
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
          className={`search-filter-icon-button ${
            activeFilter === "location" ? "is-active" : ""
          }`}
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
      {showDropdownContent && (
        <SearchDropdown
          showInitialSearchMessage={showInitialSearchMessage}
          showProprietors={showProprietors}
          showLocations={showLocations}
          loadingProprietors={loadingProprietors}
          visibleProprietorResults={visibleProprietorResults}
          visibleLocationResults={visibleLocationResults}
          showNoProprietorsMessage={showNoProprietorsMessage}
          showNoLocationsMessage={showNoLocationsMessage}
          onShowAll={() => dispatch(clearSearchFilter())}
          onShowProprietors={() => dispatch(toggleSearchFilter("proprietor"))}
          onShowLocations={() => dispatch(toggleSearchFilter("location"))}
          onSelectProprietor={handleProprietorSelect}
          onSelectLocation={handleLocationSelect}
        />
      )}
    </div>
  );
}

export default SearchBar;
