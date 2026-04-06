import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Marker } from "react-mapbox-gl";
import DrawingPopup from "./DrawingPopup/DrawingPopup";

type MarkerContentProps = {
  marker: any;
  visible: boolean;
  closeDescription: () => void;
  dataGroupColour: string;
  access: any;
  toggleMarker: () => void;
};

const DataGroupMarkerContent = ({
  marker,
  visible,
  closeDescription,
  dataGroupColour,
  access,
  toggleMarker,
}: MarkerContentProps) => {
  return (
    <div
      className="datagroup-style-wrapper"
      style={{ "--data-group-colour": dataGroupColour } as React.CSSProperties}
    >
      <div data-tooltip={marker.name} className="pointer">
        <div className={`marker-icon`} onClick={toggleMarker}>
          <span className="marker-icon-center">
            {/* @ts-ignore */}
            <FontAwesomeIcon icon={faCertificate} />
          </span>
          {/* @ts-ignore */}
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
            access={access}
            closeDescription={closeDescription}
          />
        )}
      </div>
    </div>
  );
};

type Props = {
  coordinates: any;
  name: string;
  description: string;
  marker: any;
  access: any;
  dataGroupColour: string;
  popupVisible: any;
  setPopupVisible: (id: any) => void;
};

const DataGroupMarker = ({
  coordinates,
  name,
  description,
  marker,
  access,
  dataGroupColour,
  popupVisible,
  setPopupVisible,
}: Props) => {
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
        access={access}
      />
    </Marker>
  );
};

export default DataGroupMarker;
