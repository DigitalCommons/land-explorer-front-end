import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useMediaQuery } from "react-responsive";
import constants from "../../constants";
import useClickOutside from "../../hooks/useClickOutside";
import { setSearchMarker, clearSearchMarker, setLngLat } from "../../actions/MapActions";
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
} from "../../actions/SearchActions";

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


  /** Collapse search bar (with small delay) if on mobile, or if there is no input. */
  const maybeCollapse = () => {
    const geocoderInput = document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0].value;
    if (isSmallScreen || geocoderInput.trim() === "") {
      setTimeout(() => collapse(), 200);
    }
  }

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
      placeholder: "Enter Location",
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
        dispatch(closeSearchDropdown());
        clearLocalLocationResults();
        return;
      }

      dispatch(openSearchDropdown());

      debounceRef.current = setTimeout(() => {
        dispatch(fetchProprietors(nextQuery));
      }, 600);
    };

    input.addEventListener("input", handleInput);
    inputListenerCleanupRef.current = () => {
      input.removeEventListener("input", handleInput);
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
    maybeCollapse();
  });

  const hasQuery = query.trim().length > 0;

  const showNoProprietorsMessage =
    showProprietors &&
    !loadingProprietors &&
    hasQuery &&
    visibleProprietorResults.length === 0;

  const showNoLocationsMessage =
    showLocations && hasQuery && visibleLocationResults.length === 0;

  const showDropdownContent = isDropdownOpen && hasQuery;

  // const showDropdownContent =
  //   isDropdownOpen &&
  //   (hasVisibleProprietors || hasVisibleLocations || loadingProprietors);



  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      onFocus={expand}
      onClick={expand}
      onBlur={maybeCollapse}
    >
      <span id="search-bar" />

      {showDropdownContent && (
        <div className="search-dropdown">
          <div className="search-dropdown__filters">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => dispatch(clearSearchFilter())}
            >
              All
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => dispatch(toggleSearchFilter("proprietor"))}
            >
              Owners
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => dispatch(toggleSearchFilter("location"))}
            >
              Locations
            </button>
          </div>

          {showProprietors && (
            <div className="search-dropdown__group">
              <div className="search-dropdown__heading">Owners</div>

              {loadingProprietors && visibleProprietorResults.length === 0 && (
                <div className="search-dropdown__empty">Searching owners…</div>
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
                  onClick={() => handleProprietorSelect(proprietor)}
                >
                  {proprietor.proprietorName}
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
                  onClick={() => handleLocationSelect(location)}
                >
                  {location.place_name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
