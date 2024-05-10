import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkerPin from "./MarkerPin";
import DataGroupMarker from "./DataGroupMarker";
import { Cluster, Marker } from "react-mapbox-gl";
import { autoSave } from "../../actions/MapActions";
import { featureCollection } from "@turf/turf";
import { ReactMapboxGlCluster } from "react-mapbox-gl-cluster";

const ClusterMarker = (coordinates, pointCount, getLeaves) => {
  const containsActiveMarker = getLeaves(Infinity).some(
    (marker) => marker.props.active
  );
  return (
    <Marker
      key={coordinates.toString()}
      coordinates={coordinates}
      style={{ height: "40px", zIndex: 2 }}
    >
      <div className="cluster-container cluster-grey-transparent">
        <div className="cluster-background cluster-grey">
          <p
            className={
              containsActiveMarker
                ? "cluster-text cluster-text-active"
                : "cluster-text"
            }
          >
            {pointCount}
          </p>
        </div>
      </div>
    </Marker>
  );
};

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

  // const allMarkers = dataGroupMarkers.concat(drawnMarkers);

  // TODO: we should maybe return this GeoJSON format from the backend, like we do for polys and lines
  const allMarkers = featureCollection(
    markers.map((marker) => ({
      id: marker.uuid,
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: marker.coordinates,
      },
    }))
  );

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
        <ReactMapboxGlCluster data={allMarkers} />
        // <Cluster
        //   ClusterMarkerFactory={ClusterMarker}
        //   radius={clusterRadius}
        //   zoomOnClick={true}
        //   zoomOnClickPadding={paddingOnZoom}
        // >
        //   {allMarkers}
        // </Cluster>
      )}
    </>
  );
};

export default Markers;
