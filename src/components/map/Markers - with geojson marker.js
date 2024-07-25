import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Marker, GeoJSONLayer, Layer } from "react-mapbox-gl";
import { autoSave } from "../../actions/MapActions";
import { featureCollection } from "@turf/turf";
import DataGroupMarker from "./DataGroupMarker";

// https://docs.mapbox.com/mapbox-gl-js/example/cluster/
// Create a GeoJSON source with clustered data.

// https://stackoverflow.com/questions/48157193/react-mapbox-gl-supercluster-not-returning-correct-features

// https://medium.com/@droushi/mapbox-cluster-icons-based-on-cluster-content-d462a5a3ad5c

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

  const activeMarker = useSelector((state) => state.drawings.activeMarker);
  const { activeTool } = useSelector((state) => state.leftPane);

  const handleMarkerClick = (evt, marker) => {
    
    // alert("handleMarkerClick");
    console.log("markers", markers);
    console.log("map", map);
    console.log("activeTool", activeTool);
    console.log("activeMarker", currentMarker);
    console.log("allMarkers", allMarkers);
    // console.log("UUID", marker.uuid ? marker.uuid : null);
    if (activeTool === "trash") {
      dispatch({
        type: "CLEAR_MARKER",
        payload: marker.uuid,
      });
      dispatch(autoSave());
    } else {
      debugger;
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

  // Combine all markers into one FeatureCollection
  const combinedMarkers = [];

  markers.forEach((marker) => {
    combinedMarkers.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: marker.coordinates,
      },
      properties: {
        uuid: marker.uuid,
        name: marker.name,
        description: marker.description,
        active: activeMarker === marker.uuid,
        icon: "marker-icon", // This should be the ID of the uploaded icon in Mapbox
        color: "#27ae60",
      },

    });
  });

  activeDataGroups.forEach((dataGroup) => {
    const dataGroupColour = dataGroup.hex_colour;
    if (dataGroup.markers) {
      dataGroup.markers.forEach((marker) => {
        combinedMarkers.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: marker.location.coordinates,
          },
          properties: {
            uuid: marker.uuid,
            name: marker.name,
            description: marker.description,
            active: activeMarker === marker.uuid,
            icon: "datagroup-icon", // This should be the ID of the uploaded icon in Mapbox
            color: dataGroupColour,
          },
        });
      });
    }
  });

  const allMarkers = featureCollection(combinedMarkers);

  console.log("allMarkers", allMarkers);

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
        <>
          <GeoJSONLayer
            id="clustered-points"
            data={allMarkers}
            sourceOptions={{
              cluster: true,
              clusterMaxZoom: 14,
              clusterRadius: 50,
            }}
          />
          <Layer
            id="clusters"
            type="circle"
            sourceId="clustered-points"
            filter={["has", "point_count"]}
            paint={{
              "circle-color": "#78838f",
              "circle-radius": 20,

              "circle-stroke-width": 3,
              "circle-stroke-color": "#78838f",

              // "circle-translate": [-15, -15],
            }}
          />
          <Layer
            id="cluster-count"
            type="symbol"
            sourceId="clustered-points"
            filter={["has", "point_count"]}
            layout={{
              "text-field": "{point_count_abbreviated}",
              // "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 18,
              // "text-translate": [-15, -15],
            }}
            paint={{
              "text-color": "#fff",
            }}
          />
          <Layer
            id="unclustered-point"
            // type="circle"
            type="symbol"
            sourceId="clustered-points"
            filter={["!", ["has", "point_count"]]}
            // paint={{
            //   "circle-color": "#11b4da",
            //   "circle-radius": 4,
            //   "circle-stroke-width": 1,
            //   "circle-stroke-color": "#fff",
            // }}
            layout={{
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
            paint={{
              "text-color": [
                "case",
                ["boolean", ["get", "active"], false],
                "#ff0000", // red color when active
                ["get", "color"], // default color from properties
              ],
            }}
            onClick={handleMarkerClick}
            // layerOptions={{
            //   onClick: handleMarkerClick,
            // }}
          />
        </>
      )}
    </>
  );
};

export default Markers;
