import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cluster, Marker } from "react-mapbox-gl";
import DataGroupMarker from "./DataGroupMarker";
import DataGroupPolygon from "./DataGroupPolygon";
import DataGroupLine from "./DataGroupLine";
import { loadDataGroups } from '../actions/DataGroupActions';

const ClusterMarker = (coordinates, pointCount) => {
  return (
    <Marker
      key={coordinates.toString()}
      coordinates={coordinates}
      style={{ height: "40px", zIndex: 2 }}
    >
      <div className="cluster-container">
        <div className="cluster-background">
          <p className="cluster-text">{pointCount}</p>
        </div>
      </div>
    </Marker>
  );
};

const MapDataGroups = ({ popupVisible, setPopupVisible }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDataGroups());
  }, []);

  const allDataGroups = useSelector((state) => state.dataGroups.dataGroupsData);
  const activeGroups = useSelector((state) => state.dataGroups.activeGroups);
  const activeDataGroups = allDataGroups.filter(group => activeGroups.includes(group.iddata_groups));

  const dataGroupMarkers = [];
  const dataGroupPolygons = [];
  const dataGroupLines = [];

  activeDataGroups &&
    activeDataGroups.forEach((dataGroup) => {
      if (dataGroup.markers) {
        dataGroup.markers.forEach((marker) => {
          let markerCopy = {
            ...marker,
            dataGroupId: dataGroup.iddata_groups,
          };
          dataGroupMarkers.push(
            <DataGroupMarker
              key={marker.uuid}
              coordinates={marker.location.coordinates}
              name={marker.name}
              description={marker.description}
              marker={markerCopy}
              popupVisible={popupVisible}
              setPopupVisible={setPopupVisible}
            />);
        });
      }
      if (dataGroup.polygons) {
        dataGroup.polygons.forEach((polygon) => {
          let polygonCopy = {
            ...polygon,
            dataGroupId: dataGroup.iddata_groups,
          };
          dataGroupPolygons.push(
            <DataGroupPolygon
              key={polygon.uuid}
              polygon={polygonCopy}
              setPopupVisible={setPopupVisible}
              popupVisible={popupVisible}
            />);
        });
      }
      if (dataGroup.lines) {
        dataGroup.lines.forEach((line) => {
          let lineCopy = {
            ...line,
            dataGroupId: dataGroup.iddata_groups,
          };
          dataGroupLines.push(
            <DataGroupLine
              key={line.uuid}
              line={lineCopy}
              setPopupVisible={setPopupVisible}
              popupVisible={popupVisible}
            />);
        });
      }
    });

  const clusterRadius = 60;
  // Zoom in to the minimum level that separates a cluster, if the nodes are exactly aligned
  // along the shortest screen axis. We will zoom in too much if this isn't the case, but the
  // Cluster component doesn't give us enough control to do any better.
  const paddingOnZoom = Math.min(window.innerHeight, window.innerWidth) / 2 - clusterRadius - 40;

  return (
    <>
      {dataGroupMarkers && (
        <Cluster
          ClusterMarkerFactory={ClusterMarker}
          radius={clusterRadius}
          zoomOnClick={true}
          zoomOnClickPadding={paddingOnZoom}
        >
          {dataGroupMarkers}
        </Cluster>
      )}
      {dataGroupPolygons}
      {dataGroupLines}
    </>
  );
};

export default MapDataGroups;
