import React from "react";
import Spinner from "../../../common/Spinner";

const PopupStatus = ({ mode, selectedMap, selectedDataGroup, type }) => {
  let text = "";
  let iconSrc = "";

  if (mode === "success") {
    text = `${
      type.slice(0, 1).toUpperCase() + type.slice(1)
    } successfully copied to`;
    iconSrc = require("../../../../assets/img/icon-tick--green.svg");
  } else if (mode === "error") {
    text = `Unable to copy ${type} to`;
    iconSrc = require("../../../../assets/img/icon-cross.svg");
  } else if (mode === "saving") {
    text = `Copying ${type} to`;
  }

  return (
    <div className="popup-copy-status-container">
      <p className="popup-copy-status-text">
        {text}
        <br />
        {selectedMap && `'${selectedMap.map.name}'`}
        {selectedDataGroup && `'${selectedDataGroup.title}'`}
      </p>
      {mode != "saving" ? (
        <img src={iconSrc} className="popup-status-icon" />
      ) : (
        <Spinner className="popup-status-icon" />
      )}
    </div>
  );
};

export default PopupStatus;
