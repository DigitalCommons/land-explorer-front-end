import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkerPin from "./MarkerPin";
import DataGroupMarker from "./DataGroupMarker";
import { Cluster, Marker, GeoJSONLayer } from "react-mapbox-gl";
import { autoSave } from "../../actions/MapActions";
import { featureCollection, geometry } from "@turf/turf";
import { ReactMapboxGlCluster } from "react-mapbox-gl-cluster";

// https://docs.mapbox.com/mapbox-gl-js/example/cluster/
// Create a GeoJSON source with clustered data.

const Markers = ({ map, popupVisible, setPopupVisible }) => {
  const dispatch = useDispatch();
  const allDataGroups = useSelector((state) => state.dataGroups.dataGroupsData);
  const activeGroups = useSelector((state) => state.dataGroups.activeGroups);
  const activeDataGroups = allDataGroups.filter((group) =>
    activeGroups.includes(group.iddata_groups)
  );

  const searchMarker = useSelector((state) => state.map.searchMarker);
  const currentLocation = useSelector((state) => state.map.currentLocation);
  const markers = useSelector((state) => state.markers.markers);
  const currentMarker = useSelector((state) => state.markers.currentMarker);

  const handleMarkerClick = (evt, marker) => {
    if (props.activeTool === "trash") {
      dispatch({
        type: "CLEAR_MARKER",
        payload: marker.uuid,
      });
      dispatch(autoSave());
    } else {
      const point = map.project(marker.coordinates);
      const features = map.queryRenderedFeatures(point);
      const sourceFeatures = map.querySourceFeatures("composite");
      console.log("source features", sourceFeatures);
      dispatch({ type: "CLEAR_INFO" });
      if (features.length) {
        features.map((feature) => {
          if (feature.layer.id === "provisional-agricultural-land-ab795l") {
            dispatch({
              type: "SET_INFO_AGRICULTURAL",
              payload: feature.properties,
            });
            dispatch({
              type: "OPEN_SECTION",
              payload: "agriculturalGrade",
            });
            dispatch({
              type: "OPEN_SECTION",
              payload: "siteArea",
            });
          }
        });
      }
      console.log("features", features);
      dispatch({
        type: "SET_CURRENT_MARKER",
        payload: marker.uuid,
      });
      dispatch({ type: "OPEN_LEFT_PANE" });
      dispatch({
        type: "SET_ACTIVE",
        payload: "Land Information",
      });
    }
  };

  const dataGroupMarkers = [];

  activeDataGroups &&
    activeDataGroups.forEach((dataGroup) => {
      const dataGroupColour = dataGroup.hex_colour;
      if (dataGroup.markers) {
        dataGroup.markers.forEach((marker) => {
          dataGroupMarkers.push(
            <DataGroupMarker
              dataGroupColour={dataGroupColour}
              key={marker.uuid}
              coordinates={marker.location.coordinates}
              name={marker.name}
              description={marker.description}
              marker={marker}
              popupVisible={popupVisible}
              setPopupVisible={setPopupVisible}
              currentMarker={currentMarker}
              map={map}
            />
          );
        });
      }
    });

  const drawnMarkers = markers.map((marker) => (
    <MarkerPin
      key={marker.uuid}
      coordinates={marker.coordinates}
      marker={marker}
      handleMarkerClick={handleMarkerClick}
      active={currentMarker === marker.uuid}
    />
  ));

  const markerFeatures = markers.map((marker) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: marker.coordinates,
    },
    properties: {
      uuid: marker.uuid,
      name: marker.name,
      description: marker.description,
      active: currentMarker === marker.uuid, // Determine if the marker is active
    },
  }));

  const allMarkers = featureCollection(markerFeatures);

  console.log("allMarkers", allMarkers);

  const clusterRadius = 60;
  // Zoom in to the minimum level that separates a cluster, if the nodes are exactly aligned
  // along the shortest screen axis. We will zoom in too much if this isn't the case, but the
  // Cluster component doesn't give us enough control to do any better.
  const paddingOnZoom =
    Math.min(window.innerHeight, window.innerWidth) / 2 - clusterRadius - 40;

  return (
    <>
      {searchMarker && (
        <Marker coordinates={searchMarker} style={{ zIndex: 1 }}>
          <img
            src={require("../../assets/img/icon-marker-new--red.svg")}
            alt=""
            style={{
              height: 40,
              width: 40,
            }}
          />
        </Marker>
      )}
      {currentLocation && (
        <Marker coordinates={currentLocation} style={{ zIndex: 1 }}>
          <img
            src={require("../../assets/img/icon-current-location--blue.svg")}
            alt=""
            style={{
              height: 30,
              width: 30,
            }}
          />
        </Marker>
      )}
      {allMarkers && (
        <GeoJSONLayer
          data={allMarkers} // Pass the FeatureCollection to GeoJSONLayer
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
            "text-color": [
              "case",
              ["boolean", ["get", "active"], false], // Check if the marker is active
              , // Active color (green)
              "#78838f", // Default color (grey)
            ],
          }}
        />
      )}
      {dataGroupMarkers}
      <ReactMapboxGlCluster data={allMarkers} />
    </>
  );
};

export default Markers;
