import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useMediaQuery } from "react-responsive";
import constants from "../../constants";
import { setSearchMarker, clearSearchMarker, setLngLat } from "../../actions/MapActions";

const SearchBar = ({ expanded, setExpanded }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 550px)' });

  /** Collapse search bar (with small delay) if on mobile, or if there is no input. */
  const maybeCollapse = () => {
    const geocoderInput = document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0].value;
    if (isSmallScreen || geocoderInput.trim() === "") {
      setTimeout(() => collapse(), 200);
    }
  }

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: constants.GEOCODER_TOKEN,
      placeholder: "Enter Location",
      countries: "gb",
      zoom: 13,
    });

    geocoder.on("result", result => {
      document.activeElement.blur();
      dispatch(setSearchMarker(result.result.center[0], result.result.center[1]));
      dispatch(setLngLat(result.result.center[0], result.result.center[1]));
    });
    geocoder.on("clear", () => dispatch(clearSearchMarker()));

    document.getElementById("search-bar").appendChild(geocoder.onAdd());
  }, []);

  const expand = () => {
    if (expanded)
      return;
    setExpanded(true);
    const geocoder = document.getElementById("search-bar").children[0];
    geocoder.classList.remove("geocoder-collapsed");
    geocoder.classList.add("geocoder-expanded");
  }

  const collapse = () => {
    if (!expanded)
      return;
    setExpanded(false);
    const geocoder = document.getElementById("search-bar").children[0];
    geocoder.classList.remove("geocoder-expanded");
    geocoder.classList.add("geocoder-collapsed");
    document.activeElement.blur();
  }

  return <span id="search-bar" onFocus={expand} onClick={expand} onBlur={maybeCollapse} ref={ref}></span>
}

export default SearchBar;
