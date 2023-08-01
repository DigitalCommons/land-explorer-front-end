import React, { useState } from "react";
import { Marker } from "react-mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import DrawingPopup from "./DrawingPopup/DrawingPopup";

const MarkerPin = ({ marker, active }) => {
  const dispatch = useDispatch();
  const activeTool = useSelector((state) => state.leftPane.activeTool);
  const baseLayer = useSelector((state) => state.mapBaseLayer.layer);
  const [popupClosed, setPopupClosed] = useState(false);

  const showPopup = !popupClosed && active && !activeTool;

  const toggleMarker = () => {
    if (!activeTool) {
      if (active) {
        dispatch({ type: "CLEAR_CURRENT_MARKER" });
        setPopupClosed(false);
      } else {
        dispatch({
          type: "SET_CURRENT_MARKER",
          payload: marker.uuid,
        });
      }
    }
  };

  return (
    <Marker
      key={marker.uuid}
      coordinates={marker.coordinates}
      name={marker.name}
      description={marker.description}
      anchor="bottom"
      style={{ height: "40px", zIndex: active ? 4 : 3 }}
    >
      <div>
        <div data-tooltip={marker.name} className="pointer">
          <div
            className={
              active
                ? "marker-icon-active"
                : baseLayer === "aerial"
                ? "marker-icon-aerial"
                : "marker-icon"
            }
            style={{
              height: 40,
              width: 40,
              zIndex: 2,
              position: "absolute",
              top: "0px",
              left: "-20px",
            }}
            onClick={toggleMarker}
          />
          <span className="marker-shadow"></span>
        </div>
        {showPopup && (
          <div
            style={{
              position: "relative",
              bottom: "-5px",
            }}
          >
            <DrawingPopup
              object={marker}
              type={"marker"}
              source={"map"}
              closeDescription={toggleMarker}
            />
          </div>
        )}
      </div>
    </Marker>
  );
};

export default MarkerPin;
