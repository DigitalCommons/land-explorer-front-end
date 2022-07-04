import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import axios from "axios/index";
import constants from "../constants";
import { getAuthHeader } from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import { Cluster, Marker } from "react-mapbox-gl";

const dummyData = [
  {
    id: 1,
    name: "User Group One",
    dataGroups: [
      {
        title: "Data Group One",
        iddata_groups: 1,
        markers: [
          {
            idmarkers: 1,
            name: "Great First Marker",
            description:
              "The finest marker you ever did see old buddy old chum",
            location: {
              coordinates: [-1.5, 55],
            },
          },
          {
            idmarkers: 2,
            name: "Second Great Marker",
            description: "This marker truly rivals the first! Extra long and extra salty Extra long and extra salty Extra long and extra salty Extra long and extra salty Extra long and extra salty Extra long and extra salty",
            location: {
              coordinates: [-1.6, 55],
            },
          },
          {
            idmarkers: 3,
            name: "Fantastic Third Marker",
            description:
              "Just when you thought markers couldn't get any better, they do.",
            location: {
              coordinates: [-1.6, 54.8],
            },
          },
        ],
      },
    ],
  },
];

const DataGroupMarkerContent = ({ marker, visible, closeDescription }) => (
  <div>
    <div data-tooltip={marker.name} className="pointer">
      <div
        className="marker-icon-blue"
        style={{
          height: 40,
          width: 40,
          zIndex: 2,
          position: "absolute",
          top: '0px',
          left: '-20px',
        }}
      ></div>
      <span
        style={{
          color: 'white',
          position: 'absolute',
          top: '4px',
          left: '-6px',
          zIndex: 3,
        }}
      >
        <FontAwesomeIcon icon={faCertificate} />
      </span>
      <span className="marker-shadow"></span>
    </div>
    {visible && (
      <div
        className="popup-content"
      >
        <div className="popup-close" onClick={() => closeDescription()} />
        <h3>{marker.name}</h3>
        <p className="description-text">{marker.description}</p>
      </div>
    )}
  </div>
);

const ClusterMarker = (coordinates, pointCount) => {
  return (
    <Marker
      key={coordinates.toString()}
      coordinates={coordinates}
      style={{ height: "40px", zIndex: 1 }}
    >
      <div className="cluster-container">
        <div className="cluster-background">
          <p className="cluster-text">{pointCount}</p>
        </div>
      </div>
    </Marker>
  );
};

const MapDataGroups = ({ markerVisible, setMarkerVisible }) => {
  const dispatch = useDispatch();
  const [dataGroups, setDataGroups] = useState();
  const activeGroups = useSelector((state) => state.dataGroups.activeGroups);

  const loadDataGroups = async () => {

    /*
    const result = await axios.get(
      `${constants.ROOT_URL}/api/userdatagroups`,
      getAuthHeader()
    );

    const userGroupsData = result.data;
*/

    const userGroupsData = dummyData;

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

  activeDataGroups &&
    activeDataGroups.forEach((dataGroup) => {
      dataGroup.markers.forEach((marker) => {
        dataGroupMarkers.push(
          <Marker
            key={marker.idmarkers}
            coordinates={marker.location.coordinates}
            name={marker.name}
            description={marker.description}
            anchor="bottom"
            style={{ height: "40px", zIndex: 1 }}
            onClick={() => {
              if (markerVisible != marker.idmarkers)
                setMarkerVisible(marker.idmarkers);
            }}
          >
            <DataGroupMarkerContent
              marker={marker}
              visible={markerVisible == marker.idmarkers}
              closeDescription={() => setMarkerVisible(0)}
            />
          </Marker>
        );
      });
    });

  return (
    <>
      {dataGroupMarkers && (
        <Cluster ClusterMarkerFactory={ClusterMarker}>
          {dataGroupMarkers}
        </Cluster>
      )}
    </>
  );
};

export default MapDataGroups;
