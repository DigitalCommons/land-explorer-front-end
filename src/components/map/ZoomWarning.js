import React from "react";
import { useSelector } from "react-redux";
import constants from "../../constants";

const ZoomWarning = ({ show, onZoomToRequired }) => {
  const { activeDisplay } = useSelector((state) => state.landOwnership);

  // Determine required zoom level
  const getRequiredZoomLevel = () => {
    // For ownership layers
    if (activeDisplay && constants.LR_POLYGONS_ENABLED) {
      return constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[activeDisplay];
    }
    // For data layers
    return 9; // Default zoom level for data layers
  };

  // Handle click to zoom in
  const handleZoomClick = () => {
    const requiredZoom = getRequiredZoomLevel();
    if (onZoomToRequired) {
      onZoomToRequired(requiredZoom);
    }
  };

  return (
    <div
      onClick={handleZoomClick}
      className="zoom-warning-button"
      style={{
        transform: show ? "translateX(0px)" : "translateX(12px)",
        opacity: show ? 1 : 0,
      }}
    >
      <span>Zoom in to see layer</span>
      <i className="zoom-warning-button__icon"></i>
    </div>
  );
};

export default ZoomWarning;