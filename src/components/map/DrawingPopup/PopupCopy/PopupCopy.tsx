import React from "react";
import { MODE } from "../DrawingPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap, faLayerGroup} from "@fortawesome/free-solid-svg-icons";
import iconCancel from "../../../../assets/img/icon-cancel.svg";

const COPY_TO = {
  MAP: "map",
  DATA_GROUP: "datagroup",
};

type Props = {
  object: any;
  copyTo: string;
  setCopyTo: (value: string) => void;
  selectedMap: any;
  setSelectedMap: (map: any) => void;
  selectedDataGroup: any;
  setSelectedDataGroup: (dataGroup: any) => void;
  maps: any[];
  dataGroups: any[];
  copyObjectToMap: (object: any, map: any) => void;
  copyObjectToDataGroup: (object: any, dataGroup: any) => void;
  setMode: (mode: string) => void;
  type: string;
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
}: Props) => {
  const handleCopyToChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = (event.target as HTMLButtonElement).value;
    if (value === COPY_TO.MAP) {
      setSelectedDataGroup(undefined);
    } else {
      setSelectedMap(undefined);
    }
    setCopyTo(value);
  };

  const handleMapSelection = (map: any) => {
    setSelectedMap(map);
  };

  const handleDataGroupSelection = (dataGroup: any) => {
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
            {/* @ts-ignore */}
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
            {/* @ts-ignore */}
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
                  selectedMap && selectedMap.eid === map.eid
                    ? " copy-to-option-highlighted"
                    : ""
                }`}
                onClick={() => handleMapSelection(map)}
                key={map.eid}
              >
                <span className="popup-copy-to-name">{map.name}</span>
                {selectedMap && selectedMap.eid === map.eid && (
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
            src={iconCancel}
            className="popup-footer-icon"
          />
          Cancel
        </button>
      </div>
    </>
  );
};

export default PopupCopy;
