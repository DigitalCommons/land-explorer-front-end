import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Marker } from "react-mapbox-gl";
import DrawingPopup from "./DrawingPopup/DrawingPopup";
import useStringToClassName from "../../hooks/useStringToClassName";

const DataGroupMarkerContent = ({
  marker,
  visible,
  closeDescription,
  dynamicClass,
  toggleMarker,
}) => {
  return (
    <div>
      <div data-tooltip={marker.name} className="pointer">
        {/* <div
          className={`marker-icon-green`}
          style={{
            height: 40,
            width: 40,
            zIndex: 2,
            position: "absolute",
            top: "0px",
            left: "-20px",
          }}
        ></div> */}
        {/* <span
          style={{
            color: "#27ae60",
            position: "absolute",
            top: "0",
            left: "-14px",
            zIndex: 3,
          }}
        >
        </span> */}
        <div
          className={`marker-icon ${dynamicClass ? "" : "icon-green"}`}
          onClick={toggleMarker}
        >
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
  dataGroupTitle,
}) => {
  const dynamicClass = useStringToClassName(dataGroupTitle);

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
      // onClick={() => {
      //   if (popupVisible !== marker.uuid) setPopupVisible(marker.uuid);
      // }}
      // onClick={toggleMarker}
      className={dynamicClass && dynamicClass}
    >
      <DataGroupMarkerContent
        marker={marker}
        visible={popupVisible === marker.uuid}
        closeDescription={() => setPopupVisible(-1)}
        dynamicClass={dynamicClass}
        toggleMarker={toggleMarker}
      />
    </Marker>
  );
};

export default DataGroupMarker;
