import React, { useState } from "react";
import axios from "axios/index";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import { useDispatch, useSelector } from "react-redux";
import { saveExistingMap } from "../utils/saveMap";
import { getMyMaps } from '../actions/MapActions';
import { loadDataGroups } from '../actions/DataGroupActions';

/**
 * 
 * @param object the drawn object that the popup is associated with 
 * @param type 'marker', 'polygon' or 'line'
 * @param source 'map' or 'datagroup'
 * @param closeDescription callback when the popup is closed
 * @returns a React popup element
 */
const DrawingPopup = ({ object, type, source, closeDescription }) => {
    const dispatch = useDispatch();
    const [mode, setMode] = useState("display");
    const [name, setName] = useState(object.name);
    const [copyTo, setCopyTo] = useState("map");
    const [description, setDescription] = useState(object.description);
    const [selectedMap, setSelectedMap] = useState();
    const [selectedDataGroup, setSelectedDataGroup] = useState();
    const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
    const allMaps = useSelector((state) => state.myMaps.maps);
    const allDataGroups = useSelector((state) => state.dataGroups.dataGroupTitlesAndIDs);

    let maps, dataGroups;
    if (source === "map") {
        // All editable maps that aren't this one
        maps = allMaps.filter(map => !map.isSnapshot && map.map.eid !== currentMapId);
        dataGroups = allDataGroups;
    } else {
        // All editable maps
        maps = allMaps.filter(map => !map.isSnapshot);
        // All data groups apart from this one
        dataGroups = allDataGroups.filter(dataGroup => dataGroup.id != object.dataGroupId);
    }

    const copyObjectToMap = async (object, map) => {
        const body = {
            object: regulariseObjectData(object),
            eid: map.map.eid,
        }

        await saveExistingMap(map);
        await axios.post(`${constants.ROOT_URL}/api/user/map/save/${type}`, body, getAuthHeader());

        if (map.map.eid === currentMapId) {
            // TODO: autosave current map data. We should first move business logic in Save.js toa new method in MapActions
            dispatch(getMyMaps());
            // TODO: reload the map
        }
    }

    const copyObjectToDataGroup = async (object, dataGroup) => {
        const body = {
            object: regulariseObjectData(object),
            dataGroupId: dataGroup.id,
        }

        axios.post(`${constants.ROOT_URL}/api/user/datagroup/save/${type}`, body, getAuthHeader())

        // reload data groups with the new object
        dispatch(loadDataGroups());
    }

    const editObject = async (newName, newDescription) => {
        if (source === "map") {
            dispatch({
                type: (type === "marker") ? 'RENAME_MARKER' : 'RENAME_POLYGON',
                payload: {
                    name: newName,
                    description: newDescription,
                    uuid: object.uuid
                }
            })
        }

        if (source === "datagroup" || currentMapId !== null) {
            // Save to a datagroup or autosave to a saved map
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
                        <img src={require("../assets/img/icon-add.svg")}
                            onClick={() => { setMode("copy") }}
                            className="popup-sidebar-button"
                        />
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
                        <img src={require("../assets/img/icon-tick--green.svg")}
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
            {(mode === "copy") && (
                <>
                    <div className="popup-body-container">
                        <h3 className="popup-title">Copy {type} to:</h3>

                        <table className="popup-copy-to-tabs-container">
                            <tbody>
                                <tr>
                                    <td className={`popup-copy-to-tab ${copyTo === "map" && 'tab-active'}`}
                                        onClick={() => {
                                            setCopyTo("map");
                                            setSelectedDataGroup(undefined);
                                        }}
                                    >
                                        Map
                                    </td>
                                    <td className={`popup-copy-to-tab ${copyTo === "datagroup" && 'tab-active'}`}
                                        onClick={() => {
                                            setCopyTo("datagroup");
                                            setSelectedMap(undefined);
                                        }}
                                    >
                                        Data Layer
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="popup-body-main">
                            {(copyTo === "map") && (
                                maps.map(map =>
                                    <p
                                        className={`popup-copy-to-option${selectedMap && selectedMap.map.eid === map.map.eid && ' copy-to-option-highlighted' || ''}`}
                                        onClick={() => setSelectedMap(map)}
                                        key={map.map.eid}
                                    >
                                        {map.map.name}
                                    </p>)
                            )}
                            {(copyTo === "datagroup") && (
                                dataGroups.map(dataGroup =>
                                    <p
                                        className={`popup-copy-to-option${selectedDataGroup && selectedDataGroup.id === dataGroup.id && ' copy-to-option-highlighted' || ''}`}
                                        onClick={() => setSelectedDataGroup(dataGroup)}
                                        key={dataGroup.id}
                                    >
                                        {dataGroup.title}
                                    </p>)
                            )}
                        </div>
                    </div>
                    <div className="popup-sidebar">
                        <img src={require("../assets/img/icon-cross.svg")}
                            onClick={() => {
                                setMode("display");
                                setSelectedMap(undefined);
                                setSelectedDataGroup(undefined);
                            }}
                            className="popup-sidebar-button"
                        />
                        <img src={require(`../assets/img/icon-tick--${(selectedMap || selectedDataGroup) ? 'green' : 'grey'}.svg`)}
                            className={`popup-sidebar-button ${selectedMap || selectedDataGroup || 'popup-sidebar-button-inactive'}`}
                            onClick={() => {
                                if (selectedMap) {
                                    copyObjectToMap(object, selectedMap);
                                    setMode("complete");
                                } else if (selectedDataGroup) {
                                    copyObjectToDataGroup(object, selectedDataGroup);
                                    setMode("complete");
                                }
                            }}
                        />
                    </div>
                </>
            )}
            {(mode === "complete") && (
                <>
                    <p className="popup-save-success-text">
                        {type.slice(0, 1).toUpperCase() + type.slice(1)} successfully saved to
                        <br />
                        {selectedMap && `'${selectedMap.map.name}'`}
                        {selectedDataGroup && `'${selectedDataGroup.title}'`}
                    </p>
                    <div className="popup-sidebar">
                        <img src={require("../assets/img/icon-tick--green.svg")}
                            className="popup-sidebar-button"
                            onClick={() => {
                                closeDescription();
                                setMode("display");
                                setSelectedMap(undefined);
                                setSelectedDataGroup(undefined);
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

/**
 * The data structure of map vs datagroup objects is different, so we need to regularise this, so
 * that the data can be read by the back-end.
 */
const regulariseObjectData = (object) => ({
    name: object.name,
    description: object.description,
    vertices: object.vertices?.coordinates || object.data?.geometry?.coordinates || undefined,
    center: object.center?.coordinates || object.center || object.coordinates || object.location.coordinates,
    length: object.length || undefined,
    area: object.area || undefined,
})

export default DrawingPopup;
