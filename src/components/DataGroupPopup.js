import React, { useState } from "react";
import axios from "axios/index";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import { useDispatch, useSelector } from "react-redux";
import { saveExistingMap } from "../utils/saveMap";

const DataGroupPopup = ({ object, type, visible, closeDescription }) => {
    const [mode, setMode] = useState("display");
    const [name, setName] = useState(object.name);
    const [description, setDescription] = useState(object.description);
    const allMaps = useSelector((state) => state.myMaps.maps);
    const maps = allMaps.filter(map => !map.isSnapshot);
    const [selectedMap, setSelectedMap] = useState();
    const dispatch = useDispatch();

    const addObjectToMap = async () => {
        const body = {}
        body[type] = object;
        body.map = selectedMap;

        await saveExistingMap(selectedMap);
        await axios.post(`${constants.ROOT_URL}/api/user/map/save/${type}`, body, getAuthHeader());

        axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
            .then((response) => {
                dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
            })
    }

    const editObject = async (newName, newDescription) => {
        const body = {
            name: newName,
            description: newDescription,
            object
        };

        await axios.post(`${constants.ROOT_URL}/api/user/edit/${type}`, body, getAuthHeader());
    }

    return (
        <div>
            {visible && <div className="popup-content">
                <div className="popup-close" onClick={closeDescription} />
                {(mode === "display") && (
                    <>
                        <h3 className="popup-title">{name}</h3>
                        <div className="popup-body-container">
                            <div className="popup-body-main">
                                <p className="description-text">{description}</p>
                            </div>
                            <div className="popup-sidebar">
                                <img src={require("../assets/img/icon-add.svg")}
                                    onClick={() => { setMode("save") }}
                                    className="popup-sidebar-button"
                                />
                                <img src={require("../assets/img/icon-pencil.svg")}
                                    className="popup-sidebar-button"
                                    onClick={() => setMode("edit")}
                                />
                            </div>
                        </div>
                    </>
                )}
                {(mode === "edit") && (
                    <>
                        <h3 className="popup-title editable" id="popup-name" contentEditable>{name}</h3>
                        <div className="popup-body-container">
                            <div className="popup-body-main">
                                <p className="description-text editable" id="popup-description" contentEditable>{description}</p>
                            </div>
                            <div className="popup-sidebar">
                                <img src={require("../assets/img/icon-cross.svg")}
                                    onClick={() => {
                                        setName(object.name);
                                        setDescription(object.description);
                                        setMode("display");
                                    }}
                                    className="popup-sidebar-button"
                                />
                                <img src={require("../assets/img/icon-tick.svg")}
                                    className="popup-sidebar-button"
                                    onClick={() => {
                                        const newName = document.getElementById("popup-name").textContent;
                                        const newDescription = document.getElementById("popup-description").textContent;
                                        setName(newName);
                                        setDescription(newDescription);
                                        setMode("display");
                                        editObject(newName, newDescription);
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
                {(mode === "save") && (
                    <>
                        <h3 className="popup-title">Save {type} to:</h3>
                        <div className="popup-body-container">
                            <div className="popup-body-main">
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
                            <div className="popup-sidebar">
                                <img src={require("../assets/img/icon-cross.svg")}
                                    onClick={() => {
                                        setMode("display");
                                    }}
                                    className="popup-sidebar-button"
                                />
                                <img src={require("../assets/img/icon-tick.svg")}
                                    className="popup-sidebar-button"
                                    onClick={() => {
                                        if (selectedMap) {
                                            addObjectToMap(object, selectedMap);
                                            setMode("complete");
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
                {(mode === "complete") && (
                    <>
                        <div className="popup-body-container no-popup-title">
                            <div className="popup-body-main"><p className="popup-save-success-text">
                                {type.slice(0, 1).toUpperCase() + type.slice(1)} successfully saved to
                                <br />
                                '{selectedMap.map.name}'
                            </p></div>
                            <div className="popup-sidebar">
                                <img src={require("../assets/img/icon-tick.svg")}
                                    className="popup-sidebar-button"
                                    onClick={() => {
                                        closeDescription();
                                        setMode("display");
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>}
        </div>
    );
}

export default DataGroupPopup;