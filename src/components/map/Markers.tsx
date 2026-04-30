import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import MarkerPin from "./MarkerPin";
import DataGroupMarker from "./DataGroupMarker";
import { Cluster, Marker } from "react-mapbox-gl";
import { autoSave } from "../../actions/MapActions";
import iconMarkerRed from "../../assets/img/icon-marker-new--red.svg";
import iconCurrentLocationBlue from "../../assets/img/icon-current-location--blue.svg";

const ClusterMarker = (coordinates: any, pointCount: number, getLeaves: any) => {
  const containsActiveMarker = getLeaves(Infinity).some(
    (marker: any) => marker.props.active
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

type Props = {
  map: any;
  popupVisible: any;
  setPopupVisible: (id: any) => void;
};

const Markers = ({ map, popupVisible, setPopupVisible }: Props) => {
  const dispatch = useAppDispatch();
  const allDataGroups = useAppSelector((state) => state.dataGroups.dataGroupsData);
  const activeGroups = useAppSelector((state) => state.dataGroups.activeGroups);
  const activeDataGroups = allDataGroups.filter((group: any) =>
    activeGroups.includes(group.id)
  );

  const searchMarker = useAppSelector((state) => state.map.searchMarker);
  const currentLocation = useAppSelector((state) => state.map.currentLocation);
  const markers = useAppSelector((state) => state.markers.markers);
  const currentMarker = useAppSelector((state) => state.markers.currentMarker);

  const handleMarkerClick = (_evt: any, marker: any) => {
    // @ts-ignore
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
        features.map((feature: any) => {
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

  const dataGroupMarkers: React.ReactElement[] = [];

  activeDataGroups &&
    activeDataGroups.forEach((dataGroup: any) => {
      const dataGroupColour = dataGroup.hex_colour;
      if (dataGroup.markers) {
        dataGroup.markers.forEach((marker: any) => {
          dataGroupMarkers.push(
            <DataGroupMarker
              dataGroupColour={dataGroupColour}
              key={marker.uuid}
              coordinates={marker.location.coordinates}
              name={marker.name}
              description={marker.description}
              marker={marker}
              access={dataGroup.access}
              popupVisible={popupVisible}
              setPopupVisible={setPopupVisible}
            />
          );
        });
      }
      const showMarkersInPolys = dataGroup.show_marker_in_polys > 0;

      if (showMarkersInPolys) {
        if (dataGroup.polygons) {
          dataGroup.polygons.forEach((polygon: any) => {
            dataGroupMarkers.push(
              <DataGroupMarker
                dataGroupColour={dataGroupColour}
                key={polygon.uuid}
                coordinates={polygon.center.coordinates}
                name={polygon.name}
                description={polygon.description}
                marker={polygon}
                access={dataGroup.access}
                popupVisible={false} // we don't want this additional marker to show a popup of its own
                setPopupVisible={setPopupVisible} // setPopupVisible will use the UUID of the polygon, toggling the polygon's own popup
              />
            );
          });
        }
      }
    });

  const drawnMarkers = markers.map((marker: any) => (
    <MarkerPin
      key={marker.uuid}
      coordinates={marker.coordinates}
      marker={marker}
      handleMarkerClick={handleMarkerClick}
      active={currentMarker === marker.uuid}
    />
  ));

  const allMarkers = dataGroupMarkers.concat(drawnMarkers);

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
            src={iconMarkerRed}
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
            src={iconCurrentLocationBlue}
            alt=""
            style={{
              height: 30,
              width: 30,
            }}
          />
        </Marker>
      )}
      {allMarkers && (
        // @ts-ignore
        <Cluster
          ClusterMarkerFactory={ClusterMarker}
          radius={clusterRadius}
          zoomOnClick={true}
          zoomOnClickPadding={paddingOnZoom}
        >
          {allMarkers}
        </Cluster>
      )}
    </>
  );
};

export default Markers;
