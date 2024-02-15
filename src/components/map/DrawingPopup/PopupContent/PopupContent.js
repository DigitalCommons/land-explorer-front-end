import React from "react";
import { MODE } from "../DrawingPopup";
import { useDispatch, useSelector } from "react-redux";
import { toggleMapLock } from "../../../../actions/MapActions";

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
  const dispatch = useDispatch();
  const { locked } = useSelector((state) => state.map);

  const handleEditClick = async () => {
    // Lock the map if it's unlocked
    if (!locked) {
      await dispatch(toggleMapLock());
    }
    setMode(MODE.EDIT);
  };

  const handleSaveClick = async () => {
    await dispatch(toggleMapLock()); // Unlock the map when saving
    setMode(MODE.DISPLAY);
  };

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
              suppressContentEditableWarning={true}
              contentEditable
            >
              {name}
            </h3>
            <div className="popup-body-main">
              <p
                className="description-text editable"
                id="popup-description"
                suppressContentEditableWarning={true}
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
              // onClick={() => setMode(MODE.EDIT)}
              onClick={handleEditClick}
              disabled={readOnly}
            >
              <img
                src={require(`../../../../assets/img/icon-edit-new.svg`)}
                className="popup-footer-icon"
              />
              <span className="popup-footer-button-text">
                {locked ? "Map Locked" : "Edit Marker"}
              </span>
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
                handleSaveClick();
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
