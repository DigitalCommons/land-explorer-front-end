import React, { useState } from "react";
import axios from "axios/index";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import { useDispatch, useSelector } from "react-redux";
import { saveExistingMap } from "../utils/saveMap";

const DataGroupPopup = ({ object, type, visible, closeDescription }) => {
    const [mode, setMode] = useState("display");
    const allMaps = useSelector((state) => state.myMaps.maps);
    const maps = allMaps.filter(map => !map.isSnapshot);
    const [selectedMap, setSelectedMap] = useState();
    const dispatch = useDispatch();

    const addObjectToMap = async () => {
        const body = {}
        body[type] = object;
        body.map = selectedMap;

        await saveExistingMap(selectedMap);
        await axios.post(`${constants.ROOT_URL}/api/user/map/save/${type}`, body, getAuthHeader())

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
                })*/
            })


    }

    return (
        <div>
            {visible && (mode === "display") && (
                <div className="popup-content">
                    <div className="popup-close" onClick={closeDescription} />
                    <h3 className="popup-title">{object.name}</h3>
                    <p className="description-text">{object.description}</p>
                    <div className="popup-save-icon-container" onClick={() => setMode("save")}>
                        <div className="popup-save-icon" />
                    </div>
                </div>
            )}
            {visible && (mode === "save") && (
                <div className="popup-content">
                    <div className="popup-close" onClick={() => { setMode("display"); closeDescription(); }} />
                    <h3 className="popup-title">Save {type} to:</h3>
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
                                addObjectToMap(object, selectedMap);
                                setMode("complete");
                            }
                        }}
                    > Save</div>
                </div>
            )}
            {visible && (mode === "complete") && (
                <div className="popup-content">
                    <p className="popup-save-success-text">
                        {type == "polygon" ? "Polygon" : "Line"} successfully saved to
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

export default DataGroupPopup;