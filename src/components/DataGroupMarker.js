import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import axios from "axios/index";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import { useDispatch, useSelector } from "react-redux";
import { Marker } from "react-mapbox-gl";
import { saveExistingMap } from "../utils/saveMap";

const DataGroupMarkerContent = ({ marker, visible, closeDescription }) => {
    const [mode, setMode] = useState("display");
    const allMaps = useSelector((state) => state.myMaps.maps);
    const maps = allMaps.filter(map => !map.isSnapshot);
    const [selectedMap, setSelectedMap] = useState();
    const dispatch = useDispatch();

    const addMarkerToMap = async () => {
        const body = {
            marker,
            map: selectedMap
        };

        await saveExistingMap(selectedMap);
        await axios.post(`${constants.ROOT_URL}/api/user/map/save/marker`, body, getAuthHeader());

        axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
            .then((response) => {
                dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });

                /*

                don't load the map you just saved to any more

                const maps = response.data;

                maps.forEach(map => {
                    if (map.map.eid === selectedMap.map.eid) {
                        // this bit doesn't work
                        axios.post(`${constants.ROOT_URL}/api/user/map/view/`, {
                            "eid": map.map.eid,
                        }, getAuthHeader())
                        //pick up the old name for the landDataLayers
                        console.log(map)
                        const savedMap = JSON.parse(map.map.data);

                        if (savedMap.mapLayers.activeLayers) {
                            savedMap.mapLayers.landDataLayers = savedMap.mapLayers.activeLayers;
                        }
                        //fix that some have no dataLayers
                        if (!savedMap.mapLayers.myDataLayers) {
                            savedMap.mapLayers.myDataLayers = [];
                        }
                        dispatch({
                            type: 'LOAD_MAP',
                            payload: savedMap,
                            id: map.map.eid
                        });
                    }
                })
                */
            })


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
                <div className="popup-content popup-with-marker">
                    <div className="popup-close" onClick={closeDescription} />
                    <h3 className="popup-title">{marker.name}</h3>
                    <p className="description-text">{marker.description}</p>
                    <div className="popup-save-icon-container" onClick={() => setMode("save")}>
                        <div className="popup-save-icon" />
                    </div>
                </div>
            )}
            {visible && (mode === "save") && (
                <div className="popup-content popup-with-marker">
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
                <div className="popup-content popup-with-marker">
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

const DataGroupMarker = ({ coordinates, name, description, marker, popupVisible, setPopupVisible }) =>
    <Marker
        key={marker.uuid}
        coordinates={coordinates}
        name={name}
        description={description}
        anchor="bottom"
        style={{
            height: "40px",
            zIndex: popupVisible == marker.uuid ? 4 : 3
        }}
        onClick={() => {
            if (popupVisible !== marker.uuid)
                setPopupVisible(marker.uuid);
        }}
    >
        <DataGroupMarkerContent
            marker={marker}
            visible={popupVisible == marker.uuid}
            closeDescription={() => setPopupVisible(-1)}
        />
    </Marker>

export default DataGroupMarker;