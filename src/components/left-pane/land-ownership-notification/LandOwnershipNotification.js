import React, { useState } from 'react'



const LandOwnershipNotification = () => {
  
  const getStoredValue = () => {
    try {
      return (
        sessionStorage.getItem("lx.landOwnershipNotification.hidden") === "true"
      );
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
      sessionStorage.setItem("lx.landOwnershipNotification.hidden", "true");
    } catch (error) {
      console.warn("Could not save notification state:", error);
    }
    console.log("Land ownership notification dismissed", isDismissed);
  };

  return (
    <div aria-live="polite" className="warning-notification">
      <i className="warning-notification__icon"></i>
      <div className="warning-notification__content">
        Land ownership data may be out of date. Please verify critical
        information through a{" "}
        <a
          href="https://search-property-information.service.gov.uk/search/search-by-title-number"
          target="_blank"
          rel="noopener noreferrer"
        >
          Land Registry search.
        </a>
      </div>
      <button
        className="warning-notification__close-button"
        aria-label="Close notification"
        onClick={handleClose}
      >
        <i className="warning-notification__close-icon"></i>
      </button>
    </div>
  );
};

export default LandOwnershipNotification
