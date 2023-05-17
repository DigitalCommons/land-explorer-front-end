import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import constants from "../../constants";
import { setSearchMarker, clearSearchMarker, setLngLat } from "../../actions/MapActions";

const GeoCoder = ({ expanded, setExpanded }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    const windowClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        collapse();
      }
    }
    window.addEventListener('click', windowClick)
    return () => window.removeEventListener('click', windowClick)
  }, [])

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: constants.GEOCODER_TOKEN,
      placeholder: "Enter Location",
      countries: "gb",
      zoom: 13,
      reverseGeocode: true
    });

    geocoder.on("result", result => {
      dispatch(setSearchMarker(result.result.center[0], result.result.center[1]));
      dispatch(setLngLat(result.result.center[0], result.result.center[1]));
    });
    geocoder.on("clear", () => dispatch(clearSearchMarker()));

    document.getElementById("geocoder").appendChild(geocoder.onAdd());
  }, []);

  const toggleExpansion = () => {
    if (expanded)
      collapse();
    else
      expand();
  }

  const expand = () => {
    setExpanded(true);
    const geocoder = document.getElementById("geocoder").children[0];
    geocoder.classList.add("geocoder-expanded");
  }

  const collapse = () => {
    setExpanded(false);
    const geocoder = document.getElementById("geocoder").children[0];
    geocoder.classList.remove("geocoder-expanded");
  }

  return <span id="geocoder" onClick={toggleExpansion} ref={ref}></span>
}

export default GeoCoder;