import React, { useState } from 'react'

const LandOwnershipNotification = () => {
  const [isVisible, setIsVisible] = useState(
  sessionStorage.getItem('lx.landOwnershipNotification.hidden') === 'true'
  );

  if (isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(true);
    sessionStorage.setItem('lx.landOwnershipNotification.hidden', 'true');
  };

  return (
    <div aria-live="polite" className="warning-notification">
      <i className="warning-notification__icon"></i>
      <div className="warning-notification__content">
        Land ownership data may be out of date. Please verify critical
        information through a <a href='https://search-property-information.service.gov.uk/search/search-by-title-number'>Land Registry search.</a>
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
}

export default LandOwnershipNotification
