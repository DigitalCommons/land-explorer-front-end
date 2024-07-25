import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Marker, GeoJSONLayer, Layer } from "react-mapbox-gl";
import { autoSave } from "../../actions/MapActions";
import { featureCollection } from "@turf/turf";
import DataGroupMarker from "./DataGroupMarker";

const Markers = ({ map, popupVisible, setPopupVisible, drawControlRef }) => {
  const dispatch = useDispatch();
  const allDataGroups = useSelector((state) => state.dataGroups.dataGroupsData);
  const activeGroups = useSelector((state) => state.dataGroups.activeGroups);
  const activeDataGroups = allDataGroups.filter((group) =>
    activeGroups.includes(group.iddata_groups)
  );

  const searchMarker = useSelector((state) => state.map.searchMarker);
  const currentLocation = useSelector((state) => state.map.currentLocation);
  const markers = useSelector((state) => state.markers.markers);
  // const currentMarker = useSelector((state) => state.markers.currentMarker);
  const activeMarker = useSelector((state) => state.markers.currentMarker);

  // const activeMarker = useSelector((state) => state.drawings.activeMarker);
  const { activeTool } = useSelector((state) => state.leftPane);

  console.log("Are there markers?", activeMarker);

  const handleMarkerClick = (evt, marker) => {
    console.log("Marker clicked:", marker);
    // Handle marker click
  };

  const combinedMarkers = markers.map((marker) => ({
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
      icon: "marker-icon",
      color: "#27ae60",
    },
  }));

  const allMarkers = featureCollection(combinedMarkers);

  useEffect(() => {
    if (drawControlRef.current) {
      const drawControl = drawControlRef.current.draw;
      // Clear existing points
      const existingPoints = drawControl
        .getAll()
        .features.filter((f) => f.geometry.type === "Point");
      existingPoints.forEach((point) => drawControl.delete(point.id));
      // Add new points
      combinedMarkers.forEach((marker) => drawControl.add(marker));
    }
  }, [markers]);

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
            }}
          />
          <Layer
            id="cluster-count"
            type="symbol"
            sourceId="clustered-points"
            filter={["has", "point_count"]}
            layout={{
              "text-field": "{point_count_abbreviated}",
              "text-size": 18,
            }}
            paint={{
              "text-color": "#fff",
            }}
          />
          <Layer
            id="unclustered-point"
            type="symbol"
            sourceId="clustered-points"
            filter={["!", ["has", "point_count"]]}
            layout={{
              "text-line-height": 1,
              "text-padding": 0,
              "text-anchor": "center",
              "text-offset": [0, -0.3],
              "text-allow-overlap": true,
              "text-ignore-placement": true,
              "text-field": String.fromCharCode("0xF3C5"),
              "icon-optional": true,
              "text-font": ["Font Awesome 6 Free Solid"],
              "text-size": 35,
            }}
            paint={{
              "text-color": [
                "case",
                ["boolean", ["get", "active"], false],
                "#ff0000",
                ["get", "color"],
              ],
            }}
            onClick={handleMarkerClick}
          />
        </>
      )}
    </>
  );
};

export default Markers;
