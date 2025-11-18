import React, { useState } from "react";

const DismissibleNotification = ({
  storageKey,
  notificationType,
  content,
}) => {
  const getStoredValue = () => {
    try {
      return sessionStorage.getItem(storageKey) === "true";
    } catch {
      return false;
    }
  };

  const [isDismissed, setIsDismissed] = useState(getStoredValue());

  if (isDismissed) {
    return null;
  }

  const handleClose = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "true");
    } catch (error) {
      console.warn("Could not save notification state:", error);
    }
  };

  return (
    <div
      aria-live="polite"
      className={`notification notification--${notificationType} notification--left-pane`}
    >
      <i className="notification_icon"></i>
      <div className="notification_content">{content}</div>
      <button
        className="notification__close-button"
        aria-label="Close notification"
        onClick={handleClose}
      >
        <i className="notification__close-icon"></i>
      </button>
    </div>
  );
};

export default DismissibleNotification;
