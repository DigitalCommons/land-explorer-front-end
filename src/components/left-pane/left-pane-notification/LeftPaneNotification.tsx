import React, { useState } from "react";

/**
 * LeftPaneNotification
 *
 * Displays a dismissible notification in the left pane.
 *
 * @param {string} notificationId - A unique identifier for the notification.
 * @param {"info" | "warning" | "error"} notificationType
 *    The style/type of notification.
 *    (Allowed values: "info", "warning", "error")
 * @param {React.ReactNode} content - The notification body content.
 */

type Props = {
  notificationId: string;
  notificationType: "info" | "warning" | "error";
  content: React.ReactNode;
};

const LeftPaneNotification = ({
  notificationId,
  notificationType,
  content,
}: Props) => {
  const storageKey = `lx.notification.${notificationId}.hidden`;

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

export default LeftPaneNotification;
