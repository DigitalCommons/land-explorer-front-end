import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import axios from "axios/index";
import constants from "../constants";
import { getAuthHeader } from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import { Cluster, Marker } from "react-mapbox-gl";

const DataGroupMarkerContent = ({ marker, visible, closeDescription }) => {
  const [mode, setMode] = useState("display");
  const maps = useSelector((state) => state.myMaps.maps);
  const [selectedMap, setSelectedMap] = useState();
  const dispatch = useDispatch();

  const addMarkerToMap = async () => {
    const body = {
      marker,
      map: selectedMap
    };

    axios.post(`${constants.ROOT_URL}/api/user/map/save/marker`, body, getAuthHeader())
      .then(() => {
        axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
          .then((response) => {
            dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
          })
      });

  }

  return (
    <div>
      <div
        data-tooltip={marker.name}
        className="pointer">
        <div
          className="marker-icon-green"
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
      {visible && (mode === "display") && (
        <div className="popup-content">
          <div className="popup-close" onClick={closeDescription} />
          <h3 className="popup-title">{marker.name}</h3>
          <p className="description-text">{marker.description}</p>
          <div className="popup-save-icon-container" onClick={() => setMode("save")}>
            <div className="popup-save-icon" />
          </div>
        </div>
      )}
      {visible && (mode === "save") && (
        <div className="popup-content">
          <div className="popup-close" onClick={() => { setMode("display"); closeDescription(); }} />
          <h3 className="popup-title">Save marker pin to:</h3>
          <div className="popup-save-map-container">
            {
              maps.map(map =>
                <p
                  className={`popup-save-map-option ${selectedMap && selectedMap.map.eid === map.map.eid && "save-map-highlighted"}`}
                  onClick={() => setSelectedMap(map)}
                >
                  {map.map.name}
                </p>)
            }
          </div>
          <div className="save-map-button"
            onClick={() => {
              if (selectedMap) {
                addMarkerToMap(marker, selectedMap);
                setMode("complete");
              }
            }}
          > Save</div>
        </div>
      )}
      {visible && (mode === "complete") && (
        <div className="popup-content">
          <p className="popup-save-success-text">
            Marker pin successfully saved to
            <br />
            '{selectedMap.map.name}'
          </p>
          <div className="save-map-button"
            onClick={() => {
              closeDescription();
              setMode("display");
            }}
          > Ok</div>
        </div>
      )}
    </div>
  );
}



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

const MapDataGroups = ({ markerVisible, setMarkerVisible }) => {
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
            style={{
              height: "40px",
              zIndex: markerVisible == marker.idmarkers ? 4 : 3
            }}
            onClick={() => {
              if (markerVisible != marker.idmarkers)
                setMarkerVisible(marker.idmarkers);
            }}
          >
            <DataGroupMarkerContent
              marker={marker}
              visible={markerVisible == marker.idmarkers}
              closeDescription={() => setMarkerVisible(-1)}
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
