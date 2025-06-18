// src/components/left-pane/LeftPaneToggle.js
import React from "react";
import ToggleSwitch from "../common/ToggleSwitch";

const LeftPaneToggle = ({ title, on, onToggle, draggable = false }) => {
  return (
    <div
      className={`tray-item`}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        onToggle && onToggle();
      }}
    >
      <div className={`tray-item-title ${draggable && "draggable"}`}>
        {title}
      </div>
      <ToggleSwitch on={on} tooltip="ttShowHideData" />
    </div>
  );
};

export default LeftPaneToggle;
