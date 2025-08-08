import React from "react";
import { useDispatch, useSelector } from "react-redux";
import constants from "../../constants";
import { setZoom } from "../../actions/MapActions";

const ZoomWarning = ({ show }) => {
  const dispatch = useDispatch();

  const { zooming } = useSelector((state) => state.map);
  const propertiesDisplay = useSelector(
    (state) => state.landOwnership.activeDisplay
  );

  // Determine required zoom level
  const requiredZoomLevel = propertiesDisplay
    ? constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[propertiesDisplay]
    : constants.LAND_DATA_LAYER_ZOOM_LEVEL;

  return (
    <div
      onClick={() => {
        if (!zooming) {
          dispatch(setZoom([requiredZoomLevel]));
        }
      }}
      className="zoom-warning-button"
      style={{
        transform: show ? "translateY(0px)" : "translateY(-12px)",
        opacity: show ? 1 : 0,
      }}
    >
      <span>Zoom in to see layer</span>
      <i className="zoom-warning-button__icon"></i>
    </div>
  );
};

export default ZoomWarning;