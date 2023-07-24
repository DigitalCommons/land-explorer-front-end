import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveObjectToMap, editMapObjectInfo } from "../../actions/MapActions";
import {
  saveObjectToDataGroup,
  editDataGroupObjectInfo,
} from "../../actions/DataGroupActions";
import Spinner from "../common/Spinner";

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
  const readOnly = useSelector((state) => state.readOnly.readOnly);
  const isOnline = useSelector((state) => state.connectivity.isOnline);
  const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
  const allMaps = useSelector((state) => state.myMaps.maps);
  const allDataGroups = useSelector(
    (state) => state.dataGroups.dataGroupTitlesAndIDs
  );

  let maps, dataGroups;
  if (source === "map") {
    // All editable maps that aren't this one
    maps = allMaps.filter(
      (map) => !map.map.isSnapshot && map.map.eid !== currentMapId
    );
    dataGroups = allDataGroups;
  } else {
    // All editable maps
    maps = allMaps.filter((map) => !map.map.isSnapshot);
    // All data groups apart from this one
    dataGroups = allDataGroups.filter(
      (dataGroup) => dataGroup.id != object.data_group_id
    );
  }

  const copyObjectToMap = async (object, map) => {
    const data = regulariseObjectData(object);
    const success = await dispatch(saveObjectToMap(type, data, map.map.eid));
    setMode(success ? "success" : "error");
  };

  const copyObjectToDataGroup = async (object, dataGroup) => {
    const data = regulariseObjectData(object);
    const success = await dispatch(
      saveObjectToDataGroup(type, data, dataGroup.id)
    );
    setMode(success ? "success" : "error");
  };

  const editObjectInfo = async (newName, newDescription) => {
    if (source === "map") {
      dispatch(editMapObjectInfo(type, object.uuid, newName, newDescription));
    } else {
      dispatch(
        editDataGroupObjectInfo(type, object.uuid, newName, newDescription)
      );
      // TODO: indicate in the popup when this fails to save?
    }
  };

  const close = () => {
    closeDescription();
    setMode("display");
    setSelectedMap(undefined);
    setSelectedDataGroup(undefined);
  };

  return (
    <div className="popup-content">
      <div className="popup-close" onClick={close} />
      {mode === "display" && (
        <>
          <div className="popup-body-container">
            <h3 className="popup-title">{name}</h3>
            <div id="popup-body-scroll" className="popup-body-main">
              <p className="description-text">{description}</p>
            </div>
          </div>
          <div className="popup-sidebar">
            <button
              type="button"
              className="popup-footer-button popup-copy"
              onClick={() => setMode("copy")}
            >
              <img
                src={require(`../../assets/img/icon-copy-new.svg`)}
                className={`popup-sidebar-button ${
                  isOnline || "popup-sidebar-button-inactive"
                }`}
              />
              {/* <img
                src={require(`../../assets/img/icon-add--${
                  isOnline ? "green" : "grey"
                }.svg`)}
                className={`popup-sidebar-button ${
                  isOnline || "popup-sidebar-button-inactive"
                }`}
                onClick={() => {
                  setMode("copy");
                }}
              /> */}
              <span className="popup-footer-button-text">Copy to Map</span>
            </button>
            <button
              type="button"
              className="popup-footer-button popup-edit"
              onClick={() => setMode("edit")}
            >
              <img
                src={require(`../../assets/img/icon-edit-new.svg`)}
                className={`popup-sidebar-button ${
                  readOnly && "popup-sidebar-button-inactive"
                }`}
              />
              {/* <img
                src={require(`../../assets/img/icon-pencil--${
                  readOnly ? "grey" : "green"
                }.svg`)}
                className={`popup-sidebar-button ${
                  readOnly && "popup-sidebar-button-inactive"
                }`}
                onClick={() => setMode("edit")}
              /> */}
              <span className="popup-footer-button-text">Edit Marker</span>
            </button>
          </div>
        </>
      )}
      {mode === "edit" && (
        <>
          <div className="popup-body-container">
            <h3
              className="popup-title editable"
              id="popup-name"
              contentEditable
            >
              {name}
            </h3>
            <div className="popup-body-main">
              <p
                className="description-text editable"
                id="popup-description"
                contentEditable
              >
                {description}
              </p>
            </div>
          </div>
          <div className="popup-sidebar">
            <button
              type="button"
              className="popup-footer-button popup-copy"
              onClick={() => {
                setName(object.name);
                setDescription(object.description);
                setMode("display");
              }}
            >
              <img
                src={require("../../assets/img/icon-cancel.svg")}
                className="popup-sidebar-button"
              />
              Cancel
            </button>
            <button
              type="button"
              className="popup-footer-button popup-save"
              onClick={() => {
                const newName =
                  document.getElementById("popup-name").textContent;
                const newDescription =
                  document.getElementById("popup-description").textContent;
                setName(newName);
                setDescription(newDescription);
                setMode("display");
                editObjectInfo(newName, newDescription);
              }}
            >
              <img
                src={require("../../assets/img/icon-save.svg")}
                className="popup-sidebar-button"
              />
              Save
            </button>
          </div>
        </>
      )}
      {mode === "copy" && (
        <>
          <div className="popup-body-container">
            <h3 className="popup-title copy-to-title">Copy {type} to:</h3>

            <div className="popup-copy-to-tabs-container">
              <button
                type="tab"
                className={`popup-copy-to-tab ${
                  copyTo === "map" && "tab-active"
                }`}
                onClick={() => {
                  setCopyTo("map");
                  setSelectedDataGroup(undefined);
                }}
              >
                <img
                  src={require(`../../assets/img/icon-map--${
                    copyTo === "map" && "tab-active" ? "green" : "grey"
                  }.svg`)}
                />
                Map Here
              </button>
              <button
                type="tab"
                className={`popup-copy-to-tab ${
                  copyTo === "datagroup" && "tab-active"
                }`}
                onClick={() => {
                  setCopyTo("datagroup");
                  setSelectedMap(undefined);
                }}
              >
                <img
                  src={require(`../../assets/img/icon-layers--${
                    copyTo === "datagroup" && "tab-active" ? "green" : "grey"
                  }.svg`)}
                />
                Data Layer
              </button>
            </div>

            <div className="popup-body-main">
              {copyTo === "map" &&
                maps.map((map) => (
                  <div
                    className={`popup-copy-to-option${
                      (selectedMap &&
                        selectedMap.map.eid === map.map.eid &&
                        " copy-to-option-highlighted") ||
                      ""
                    }`}
                    onClick={() => setSelectedMap(map)}
                    key={map.map.eid}
                  >
                    <span className="popup-copy-to-map-name">
                      {map.map.name}
                    </span>
                    {selectedMap && selectedMap.map.eid === map.map.eid && (
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedMap) {
                            copyObjectToMap(object, selectedMap);
                          } else if (selectedDataGroup) {
                            copyObjectToDataGroup(object, selectedDataGroup);
                          }
                          setMode("saving");
                        }}
                        className="popup-copy-to-button"
                      />
                    )}
                  </div>
                ))}
              {copyTo === "datagroup" &&
                dataGroups.map((dataGroup) => (
                  <div
                    className={`popup-copy-to-option${
                      (selectedDataGroup &&
                        selectedDataGroup.id === dataGroup.id &&
                        " copy-to-option-highlighted") ||
                      ""
                    }`}
                    onClick={() => setSelectedDataGroup(dataGroup)}
                    key={dataGroup.id}
                  >
                    {dataGroup.title}
                  </div>
                ))}
            </div>
          </div>
          <div className="popup-sidebar">
            {/* <img
              src={require("../../assets/img/icon-cross.svg")}
              onClick={() => {
                setMode("display");
                setSelectedMap(undefined);
                setSelectedDataGroup(undefined);
              }}
              className="popup-sidebar-button"
            /> */}
            <button
              type="button"
              className="popup-footer-button popup-copy"
              onClick={() => {
                setMode("display");
                setSelectedMap(undefined);
                setSelectedDataGroup(undefined);
              }}
            >
              <img
                src={require("../../assets/img/icon-cancel.svg")}
                className="popup-sidebar-button"
              />
              Cancel
            </button>
            {/* <img
              src={require(`../../assets/img/icon-tick--${
                selectedMap || selectedDataGroup ? "green" : "grey"
              }.svg`)}
              className={`popup-sidebar-button ${
                selectedMap ||
                selectedDataGroup ||
                "popup-sidebar-button-inactive"
              }`}
              onClick={() => {
                if (selectedMap) {
                  copyObjectToMap(object, selectedMap);
                } else if (selectedDataGroup) {
                  copyObjectToDataGroup(object, selectedDataGroup);
                }
                setMode("saving");
              }}
            /> */}
          </div>
        </>
      )}
      {mode === "saving" && (
        <div className="popup-copy-status-container">
          <p className="popup-copy-status-text">
            Copying {type} to
            <br />
            {selectedMap && `'${selectedMap.map.name}'`}
            {selectedDataGroup && `'${selectedDataGroup.title}'`}
          </p>
          <Spinner className="popup-status-icon" />
        </div>
      )}
      {mode === "success" && (
        <div className="popup-copy-status-container">
          <p className="popup-copy-status-text">
            {type.slice(0, 1).toUpperCase() + type.slice(1)} successfully copied
            to
            <br />
            {selectedMap && `'${selectedMap.map.name}'`}
            {selectedDataGroup && `'${selectedDataGroup.title}'`}
          </p>
          <img
            src={require("../../assets/img/icon-tick--green.svg")}
            className="popup-status-icon"
          />
        </div>
      )}
      {mode === "error" && (
        <div className="popup-copy-status-container">
          <p className="popup-copy-status-text">
            Unable to copy {type} to
            <br />
            {selectedMap && `'${selectedMap.map.name}'`}
            {selectedDataGroup && `'${selectedDataGroup.title}'`}
          </p>
          <img
            src={require("../../assets/img/icon-cross.svg")}
            className="popup-status-icon"
          />
        </div>
      )}
    </div>
  );
};

/**
 * The data structure of map vs datagroup objects is different, so we need to regularise this, so
 * that the data can be read by the back-end.
 */
const regulariseObjectData = (object) => ({
  name: object.name,
  description: object.description,
  vertices:
    object.vertices?.coordinates ||
    object.data?.geometry?.coordinates ||
    undefined,
  center:
    object.center?.coordinates ||
    object.center ||
    object.coordinates ||
    object.location.coordinates,
  length: object.length || undefined,
  area: object.area || undefined,
});

export default DrawingPopup;
