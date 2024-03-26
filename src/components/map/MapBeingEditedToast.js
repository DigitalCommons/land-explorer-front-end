import React from "react";
import { useSelector } from "react-redux";

const MapBeingEditedToast = () => {
  const lockedByUser = useSelector((state) => state.mapMeta.lockUserInitials);
  const userInitials = useSelector((state) => state.user.initials);

  console.log("lockedByUser", lockedByUser);

  return (
    <div
      className="map-being-edited"
      style={{
        display:
          lockedByUser && lockedByUser != userInitials ? "block" : "none",
      }}
    >
      <div className="map-being-edited__container">
        <div className="map-being-edited__initials">{lockedByUser}</div>
        <p className="map-being-edited__message">
          is currently editing thise map
        </p>
      </div>
    </div>
  );
};

export default MapBeingEditedToast;
