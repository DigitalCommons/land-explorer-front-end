import React from "react";
import ToggleSwitch from "../common/ToggleSwitch";
import useStringToClassName from "../../hooks/useStringToClassName";

const LeftPaneToggle = ({ title, on, onToggle, draggable = false }) => {
  const dataGroupClassName = useStringToClassName(title);

  return (
    <div className={`tray-item ${dataGroupClassName ? dataGroupClassName : ''}`} onClick={onToggle}>
      <div className={`tray-item-title ${draggable && "draggable"}`}>
        {title}
      </div>
      <ToggleSwitch on={on} tooltip="ttShowHideData" />
    </div>
  );
};

export default LeftPaneToggle;
