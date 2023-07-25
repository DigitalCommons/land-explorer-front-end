import React from 'react'

const PopupFooter = ({
  mode,
  setMode,
  setSelectedMap,
  setSelectedDataGroup,
  setDescription,
  editObjectInfo,
  setName,
  object,
}) => {
    return (
      <>
        {mode === "display" && (
          <>
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
      </>
    );
};

export default PopupFooter