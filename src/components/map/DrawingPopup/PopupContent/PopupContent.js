import React from "react";
import { MODE } from "../DrawingPopup";

const PopupContent = ({
  mode,
  setMode,
  description,
  setDescription,
  editObjectInfo,
  name,
  setName,
  isOnline,
  readOnly,
}) => {
  return (
    <>
      <div className="popup-body-container">
        {mode === MODE.DISPLAY && (
          <>
            <h3 className="popup-title">{name}</h3>
            <div id="popup-body-scroll" className="popup-body-main">
              <p className="description-text">{description}</p>
            </div>
          </>
        )}

        {mode === MODE.EDIT && (
          <>
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
          </>
        )}
      </div>

      <div className="popup-footer">
        {mode === MODE.DISPLAY && (
          <>
            <button
              type="button"
              className={`popup-footer-button popup-copy  ${
                !isOnline ? "is-offline" : ""
              }`}
              onClick={() => setMode(MODE.COPY)}
              disabled={!isOnline}
            >
              <img
                src={require(`../../../../assets/img/icon-copy-new.svg`)}
                className="popup-footer-icon"
              />
              <span className="popup-footer-button-text">Copy to Map</span>
            </button>

            <button
              type="button"
              className={`popup-footer-button popup-edit  ${
                readOnly ? "is-offline" : ""
              }`}
              onClick={() => setMode(MODE.EDIT)}
              disabled={readOnly}
            >
              <img
                src={require(`../../../../assets/img/icon-edit-new.svg`)}
                className="popup-footer-icon"
              />
              <span className="popup-footer-button-text">Edit Marker</span>
            </button>
          </>
        )}

        {mode === MODE.EDIT && (
          <>
            <button
              type="button"
              className="popup-footer-button popup-copy"
              onClick={() => {
                setName(name);
                setDescription(description);
                setMode(MODE.DISPLAY);
              }}
            >
              <img
                src={require("../../../../assets/img/icon-cancel.svg")}
                className="popup-footer-icon"
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
                setMode(MODE.DISPLAY);
                editObjectInfo(newName, newDescription);
              }}
            >
              <img
                src={require("../../../../assets/img/icon-save.svg")}
                className="popup-footer-icon"
              />
              Save
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PopupContent;
