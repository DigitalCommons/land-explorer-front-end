import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Marker } from "react-mapbox-gl";
import DrawingPopup from "./DrawingPopup/DrawingPopup";

const DataGroupMarkerContent = ({
  marker,
  visible,
  closeDescription,
  dataGroupColour,
  toggleMarker,
}) => {
  return (
    <div
      className="datagroup-style-wrapper"
      style={{ "--data-group-colour": dataGroupColour }}
    >
      <div data-tooltip={marker.name} className="pointer">
        <div className={`marker-icon`} onClick={toggleMarker}>
          <span className="marker-icon-center">
            <FontAwesomeIcon icon={faCertificate} />
          </span>
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
        <span className="marker-shadow"></span>
      </div>
      <div
        style={{
          position: "relative",
          bottom: "-5px",
        }}
        className="popup-wrapper"
      >
        {visible && (
          <DrawingPopup
            object={marker}
            type={"marker"}
            source={"datagroup"}
            closeDescription={closeDescription}
          />
        )}
      </div>
    </div>
  );
};

const DataGroupMarker = ({
  coordinates,
  name,
  description,
  marker,
  popupVisible,
  setPopupVisible,
  dataGroupColour,
}) => {
  const toggleMarker = () => {
    if (popupVisible === marker.uuid) {
      setPopupVisible(-1);
    } else {
      setPopupVisible(marker.uuid);
    }
  };

  return (
    <Marker
      key={marker.uuid}
      coordinates={coordinates}
      name={name}
      description={description}
      anchor="bottom"
      style={{
        height: "40px",
        zIndex: popupVisible === marker.uuid ? 4 : 3,
      }}
    >
      <DataGroupMarkerContent
        marker={marker}
        visible={popupVisible === marker.uuid}
        closeDescription={() => setPopupVisible(-1)}
        toggleMarker={toggleMarker}
        dataGroupColour={dataGroupColour}
      />
    </Marker>
  );
};

export default DataGroupMarker;
