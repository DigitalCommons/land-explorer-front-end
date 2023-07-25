import React from "react";

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
    if (value === "map") {
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
    if (copyTo === "map" && selectedMap) {
      copyObjectToMap(object, selectedMap);
      setMode("saving");
    } else if (copyTo === "datagroup" && selectedDataGroup) {
      copyObjectToDataGroup(object, selectedDataGroup);
      setMode("saving");
    }
  };

  return (
    <>
      <div className="popup-body-container">
        <h3 className="popup-title copy-to-title">Copy {type} to:</h3>
        <div className="popup-copy-to-tabs-container">
          <button
            type="button"
            className={`popup-copy-to-tab ${copyTo === "map" && "tab-active"}`}
            onClick={handleCopyToChange}
            value="map"
          >
            <img
              src={require(`../../../../assets/img/icon-map--${
                copyTo === "map" && "tab-active" ? "green" : "grey"
              }.svg`)}
            />
            Map Here
          </button>
          <button
            type="button"
            className={`popup-copy-to-tab ${
              copyTo === "datagroup" && "tab-active"
            }`}
            onClick={handleCopyToChange}
            value="datagroup"
          >
            <img
              src={require(`../../../../assets/img/icon-layers--${
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
                  selectedMap && selectedMap.map.eid === map.map.eid
                    ? " copy-to-option-highlighted"
                    : ""
                }`}
                onClick={() => handleMapSelection(map)}
                key={map.map.eid}
              >
                <span className="popup-copy-to-map-name">{map.map.name}</span>
                {selectedMap && selectedMap.map.eid === map.map.eid && (
                  <button
                    type="button"
                    onClick={handleCopyButtonClick}
                    className="popup-copy-to-button"
                  />
                )}
              </div>
            ))}
          {copyTo === "datagroup" &&
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
                {dataGroup.title}
              </div>
            ))}
        </div>
      </div>

      <div className="popup-sidebar">
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
            src={require("../../../../assets/img/icon-cancel.svg")}
            className="popup-sidebar-button"
          />
          Cancel
        </button>
        <button
          type="button"
          className="popup-footer-button popup-copy"
          onClick={handleCopyButtonClick}
        >
          <img
            src={require(`../../../../assets/img/icon-tick--${
              selectedMap || selectedDataGroup ? "green" : "grey"
            }.svg`)}
            className={`popup-sidebar-button ${
              selectedMap ||
              selectedDataGroup ||
              "popup-sidebar-button-inactive"
            }`}
          />
          Copy
        </button>
      </div>
    </>
  );
};

export default PopupCopy;
