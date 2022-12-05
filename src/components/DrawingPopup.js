import React, { useState } from "react";
import axios from "axios/index";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import { useDispatch, useSelector } from "react-redux";

const DrawingPopup = ({ object, type, closeDescription }) => {
    const [mode, setMode] = useState("display");
    const [name, setName] = useState(object.name);
    const [description, setDescription] = useState(object.description);
    const saved = useSelector((state) => state.map.name !== null);
    const dispatch = useDispatch();

    const editObject = async (newName, newDescription) => {
        dispatch({
            type: (type === "marker") ? 'RENAME_MARKER' : 'RENAME_POLYGON',
            payload: {
                name: newName,
                description: newDescription,
                uuid: object.uuid
            }
        })
        if (saved) {
            // Autosave
            const body = {
                name: newName,
                description: newDescription,
                object
            };
            await axios.post(`${constants.ROOT_URL}/api/user/edit/${type}`, body, getAuthHeader());
        }
    }

    return (
        <div className="popup-content">
            <div className="popup-close" onClick={closeDescription} />
            {(mode === "display") && (
                <>
                    <div className="popup-body-container">
                        <h3 className="popup-title">{name}</h3>
                        <div className="popup-body-main">
                            <p className="description-text">{description}</p>
                        </div>
                    </div>
                    <div className="popup-sidebar">
                        <img src={require("../assets/img/icon-pencil.svg")}
                            className="popup-sidebar-button"
                            onClick={() => setMode("edit")}
                        />
                    </div>
                </>
            )}
            {(mode === "edit") && (
                <>
                    <div className="popup-body-container">
                        <h3 className="popup-title editable" id="popup-name" contentEditable>{name}</h3>
                        <div className="popup-body-main">
                            <p className="description-text editable" id="popup-description" contentEditable>{description}</p>
                        </div>
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
                </>
            )}
        </div>
    );
}

export default DrawingPopup;
