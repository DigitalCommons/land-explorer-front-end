import React from "react";
import ToggleSwitch from "../common/ToggleSwitch";
import LeftPaneNotification from "./left-pane-notification/LeftPaneNotification";

const LeftPaneToggle = ({
  title,
  on,
  onToggle,
  draggable = false,
  disclaimer = false,
  disclaimerContent = <></>,
}) => {
  const disclaimerVisible = disclaimer && on;

  return (
    <>
      <div
        className={`tray-item`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle && onToggle();
        }}
      >
        <div className={`tray-item-title ${draggable && "draggable"}`}>
          {title}
        </div>
        <ToggleSwitch on={on} tooltip="ttShowHideData" />
      </div>
      {disclaimerVisible && (
        <LeftPaneNotification
          notificationId={title}
          notificationType="warning"
          content={disclaimerContent}
        />
      )}
    </>
  );
};

export default LeftPaneToggle;
