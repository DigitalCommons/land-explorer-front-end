import React, { useEffect, useState } from "react";
import axios from "axios/index";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import { useDispatch, useSelector } from "react-redux";
import { Cluster, Marker } from "react-mapbox-gl";
import DataGroupMarker from "./DataGroupMarker";
import DataGroupPolygon from "./DataGroupPolygon";
import DataGroupLine from "./DataGroupLine";

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
  const [dataGroups, setDataGroups] = useState();
  const activeGroups = useSelector((state) => state.dataGroups.activeGroups);

  const loadDataGroups = async () => {
    const result = await axios.get(
      `${constants.ROOT_URL}/api/userdatagroups`,
      getAuthHeader()
    );

    const userGroupsData = result.data;

    const mergedDataGroups = [];

    userGroupsData.forEach((userGroup) => {
      userGroup.dataGroups.forEach((dataGroup) => {
        dataGroup.userGroupId = userGroup.id;
        mergedDataGroups.push(dataGroup);
      });
    });
    setDataGroups(mergedDataGroups);

    const userGroupTitlesAndIDs = userGroupsData.map((userGroup) => ({
      title: userGroup.name,
      id: userGroup.id,
    }));
    dispatch({
      type: "SET_USER_GROUP_TITLES",
      payload: userGroupTitlesAndIDs,
    });

    const dataGroupTitlesAndIDs = mergedDataGroups.map((dataGroup) => ({
      title: dataGroup.title,
      id: dataGroup.iddata_groups,
      userGroupId: dataGroup.userGroupId,
    }));
    dispatch({
      type: "SET_DATA_GROUP_TITLES",
      payload: dataGroupTitlesAndIDs,
    });
  };

  useEffect(() => {
    loadDataGroups();
  }, []);

  const activeDataGroups =
    dataGroups &&
    dataGroups.filter((group) => activeGroups.includes(group.iddata_groups));
  dispatch({
    type: "STORE_ACTIVE_DATA_GROUPS",
    payload: activeDataGroups,
  });

  const dataGroupMarkers = [];
  const dataGroupPolygons = [];
  const dataGroupLines = [];

  activeDataGroups &&
    activeDataGroups.forEach((dataGroup) => {
      if (dataGroup.markers)
        dataGroup.markers.forEach((marker) => {
          dataGroupMarkers.push(
            <DataGroupMarker
              key={marker.idmarkers}
              coordinates={marker.location.coordinates}
              name={marker.name}
              description={marker.description}
              marker={marker}
              popupVisible={popupVisible}
              setPopupVisible={setPopupVisible}
            />)
        });
      if (dataGroup.polygons)
        dataGroup.polygons.forEach((polygon) => {
          dataGroupPolygons.push(
            <DataGroupPolygon
              polygon={polygon}
              setPopupVisible={setPopupVisible}
              popupVisible={popupVisible}
            />
          )
        });
      if (dataGroup.lines)
        dataGroup.lines.forEach((line) => {
          dataGroupLines.push(
            <DataGroupLine
              line={line}
              setPopupVisible={setPopupVisible}
              popupVisible={popupVisible}
            />
          )
        })
    });

  return (
    <>
      {dataGroupMarkers && (
        <Cluster ClusterMarkerFactory={ClusterMarker}>
          {dataGroupMarkers}
        </Cluster>
      )}
      {dataGroupPolygons}
      {dataGroupLines}
    </>
  );
};

export default MapDataGroups;