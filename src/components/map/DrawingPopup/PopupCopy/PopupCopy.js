import React from "react";
import { MODE } from "../DrawingPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap, faLayerGroup} from "@fortawesome/free-solid-svg-icons";

const COPY_TO = {
  MAP: "map",
  DATA_GROUP: "datagroup",
};

const PopupCopy = ({
  object,
  copyTo,
  setCopyTo,
  selectedMap,
  setSelectedMap,
  selectedDataGroup,
  setSelectedDataGroup,
  maps,
  dataGroups,
  copyObjectToMap,
  copyObjectToDataGroup,
  setMode,
  type,
}) => {
  const handleCopyToChange = (event) => {
    const value = event.target.value;
    if (value === COPY_TO.MAP) {
      setSelectedDataGroup(undefined);
    } else {
      setSelectedMap(undefined);
    }
    setCopyTo(value);
  };

  const handleMapSelection = (map) => {
    setSelectedMap(map);
  };

  const handleDataGroupSelection = (dataGroup) => {
    setSelectedDataGroup(dataGroup);
  };

  const handleCopyButtonClick = () => {
    if (copyTo === COPY_TO.MAP && selectedMap) {
      copyObjectToMap(object, selectedMap);
      setMode(MODE.SAVING);
    } else if (copyTo === COPY_TO.DATA_GROUP && selectedDataGroup) {
      copyObjectToDataGroup(object, selectedDataGroup);
      setMode(MODE.SAVING);
    }
  };

  return (
    <>
      <div className="popup-body-container">
        <h3 className="popup-title copy-to-title">Copy {type} to:</h3>
        {/* Tabs */}
        <div className="popup-copy-to-tabs-container">
          <button
            type="button"
            className={`popup-copy-to-tab ${
              copyTo === COPY_TO.MAP && "tab-active"
            }`}
            onClick={handleCopyToChange}
            value={COPY_TO.MAP}
          >
            {/* <img
              src={require(`../../../../assets/img/icon-map--${
                copyTo === COPY_TO.MAP && "tab-active" ? "green" : "grey"
              }.svg`)}
            /> */}
            <FontAwesomeIcon icon={faMap} />
            Map Here
          </button>
          <button
            type="button"
            className={`popup-copy-to-tab ${
              copyTo === COPY_TO.DATA_GROUP && "tab-active"
            }`}
            onClick={handleCopyToChange}
            value={COPY_TO.DATA_GROUP}
          >
            {/* <img
              src={require(`../../../../assets/img/icon-layers--${
                copyTo === COPY_TO.DATA_GROUP && "tab-active" ? "green" : "grey"
              }.svg`)}
            /> */}
            <FontAwesomeIcon icon={faLayerGroup} />
            Data Layer
          </button>
        </div>

        {/* Body */}
        <div className="popup-body-main">
          {copyTo === COPY_TO.MAP &&
            maps.map((map) => (
              <div
                className={`popup-copy-to-option${
                  selectedMap && selectedMap.map.eid === map.map.eid
                    ? " copy-to-option-highlighted"
                    : ""
                }`}
                onClick={() => handleMapSelection(map)}
                key={map.map.eid}
              >
                <span className="popup-copy-to-name">{map.map.name}</span>
                {selectedMap && selectedMap.map.eid === map.map.eid && (
                  <button
                    type="button"
                    onClick={handleCopyButtonClick}
                    className="popup-copy-to-button"
                  />
                )}
              </div>
            ))}
          {copyTo === COPY_TO.DATA_GROUP &&
            dataGroups.map((dataGroup) => (
              <div
                className={`popup-copy-to-option${
                  selectedDataGroup && selectedDataGroup.id === dataGroup.id
                    ? " copy-to-option-highlighted"
                    : ""
                }`}
                onClick={() => handleDataGroupSelection(dataGroup)}
                key={dataGroup.id}
              >
                <span className="popup-copy-to-name">{dataGroup.title}</span>
                {selectedDataGroup && selectedDataGroup.id === dataGroup.id && (
                  <button
                    type="button"
                    onClick={handleCopyButtonClick}
                    className="popup-copy-to-button"
                  />
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="popup-footer">
        <button
          type="button"
          className="popup-footer-button popup-copy"
          onClick={() => {
            setMode(MODE.DISPLAY);
            setSelectedMap(undefined);
            setSelectedDataGroup(undefined);
          }}
        >
          <img
            src={require("../../../../assets/img/icon-cancel.svg")}
            className="popup-footer-icon"
          />
          Cancel
        </button>
      </div>
    </>
  );
};

export default PopupCopy;
