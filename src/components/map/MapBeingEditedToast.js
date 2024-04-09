import React from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

const MapBeingEditedToast = () => {
  const { lockedByOtherUserInitials } = useSelector((state) => state.mapMeta);

  return (
    <div
      className="map-being-edited"
      style={{
        display: lockedByOtherUserInitials && !isMobile ? "block" : "none",
      }}
    >
      <div className="map-being-edited__container">
        <div className="map-being-edited__initials">
          {lockedByOtherUserInitials}
        </div>
        <p className="map-being-edited__message">
          is currently editing this map
        </p>
      </div>
    </div>
  );
};

export default MapBeingEditedToast;
