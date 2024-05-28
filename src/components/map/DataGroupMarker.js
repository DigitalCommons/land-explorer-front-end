import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Marker, GeoJSONLayer } from "react-mapbox-gl";
import DrawingPopup from "./DrawingPopup/DrawingPopup";
import { useSelector, useDispatch } from "react-redux";

const DataGroupMarker = ({
  coordinates,
  name,
  description,
  marker,
  popupVisible,
  setPopupVisible,
  dataGroupColour,
  currentMarker,
}) => {

  const activeMarker = useSelector((state) => state.drawings.activeMarker);
  const isActive = marker.uuid == activeMarker;
  const dispatch = useDispatch();

  const toggleMarker = () => {
    // alert("toggleMarker");
    // console.log("toggleMarker", marker.uuid, isActive, currentMarker);
    // if (popupVisible === marker.uuid) {
    //   setPopupVisible(-1);
    // } else {
    //   setPopupVisible(marker.uuid);
    // }
  };

  const handleMarkerClick = (e) => {
    // const features = e.features;
    // if (features && features.length) {
    //   toggleMarker(e);
    // }
    if (isActive) {
      dispatch({
        type: "CLEAR_ACTIVE_MARKER",
      })
    } else {
      dispatch({
        type: "SET_ACTIVE_MARKER",
        payload: marker.uuid,
      });
    }
      // alert("isActive");
      console.log("isActive", marker.uuid, isActive, activeMarker);
      // setPopupVisible(-1);
  };

  const markerData = {
    type: "Feature",
    id: marker.uuid,
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
    properties: {
      uuid: marker.uuid,
      name: name,
      description: description,
      active: currentMarker === marker.uuid,
    },
  };

  //https://github.com/mapbox/mapbox-gl-js/issues/10043

  // https://github.com/mapbox/mapbox-gl-js/issues/3605
  // Font awesome icons

  // https://stackoverflow.com/questions/57848072/mapbox-gl-js-cant-update-feature-property-with-setfeaturestate
  // Mapbox feature state

  const markerLayer = (
    <GeoJSONLayer
      key={marker.uuid}
      data={markerData}
      symbolLayout={{
        // "icon-image": "map-marker", // Name of the uploaded SVG icon
        // "icon-size": 1.5,
        // "icon-allow-overlap": true,
        // "text-field": ["get", "name"], // Display marker name
        // "text-font": ["Open Sans Bold"],
        // "text-anchor": "top",
        // "text-offset": [0, 1],
        // "text-size": 12,
        "text-line-height": 1, // this is to avoid any padding around the "icon"
        "text-padding": 0,
        "text-anchor": "center", // center, so when rotating the map, the "icon" stay on the same location
        "text-offset": [0, -0.3], // give it a little offset on y, so when zooming it stay on the right place
        "text-allow-overlap": true,
        "text-ignore-placement": true,
        "text-field": String.fromCharCode("0xF3C5"),
        "icon-optional": true, // since we're not using an icon, only text.
        "text-font": ["Font Awesome 6 Free Solid"],
        "text-size": 35,
      }}
      symbolPaint={{
        // "icon-color": dataGroupColour || "green",
        // "text-color": dataGroupColour || "green",
        // "text-color": [
        //   "case",
        //   ["boolean", ["feature-state", "active"], false],
        //   "red", // Color when active
        //   dataGroupColour, // Default color
        // ],
        "text-color": isActive ? "red" : dataGroupColour || "green",
      }}
      // symbolOnClick={toggleMarker}
      symbolOnClick={handleMarkerClick}
      // layerOptions={{
      //   onClick: onLayerClick,
      // }}
      // fillOnClick={toggleMarker}
    />
  );

  return (
    <>
      {markerLayer}
      <DrawingPopup
        object={marker}
        type={"marker"}
        source={"datagroup"}
        closeDescription={() => setPopupVisible(-1)}
      />
    </>
  );
};

export default DataGroupMarker;
