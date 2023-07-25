import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { Marker } from "react-mapbox-gl";
import DrawingPopup from "./DrawingPopup/DrawingPopup";

const DataGroupMarkerContent = ({ marker, visible, closeDescription }) => {
    return (
        <div>
            <div
                data-tooltip={marker.name}
                className="pointer">
                <div
                    className="marker-icon-green"
                    style={{
                        height: 40,
                        width: 40,
                        zIndex: 2,
                        position: "absolute",
                        top: '0px',
                        left: '-20px',
                    }}
                ></div>
                <span
                    style={{
                        color: 'white',
                        position: 'absolute',
                        top: '4px',
                        left: '-6px',
                        zIndex: 3,
                    }}
                >
                    <FontAwesomeIcon icon={faCertificate} />
                </span>
                <span className="marker-shadow"></span>
            </div>
            <div style={{
                position: "relative",
                bottom: "-5px",
            }}>
                {visible && <DrawingPopup
                    object={marker}
                    type={"marker"}
                    source={"datagroup"}
                    closeDescription={closeDescription}
                />}
            </div>

        </div>
    );
}

const DataGroupMarker = ({ coordinates, name, description, marker, popupVisible, setPopupVisible }) =>
    <Marker
        key={marker.uuid}
        coordinates={coordinates}
        name={name}
        description={description}
        anchor="bottom"
        style={{
            height: "40px",
            zIndex: popupVisible === marker.uuid ? 4 : 3
        }}
        onClick={() => {
            if (popupVisible !== marker.uuid)
                setPopupVisible(marker.uuid);
        }}
    >
        <DataGroupMarkerContent
            marker={marker}
            visible={popupVisible === marker.uuid}
            closeDescription={() => setPopupVisible(-1)}
        />
    </Marker>

export default DataGroupMarker;
