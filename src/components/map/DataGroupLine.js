import React from "react";
import { Marker, GeoJSONLayer } from "react-mapbox-gl";
import DrawingPopup from "./DrawingPopup/DrawingPopup";
import * as turf from "@turf/turf";

const DataGroupLine = ({
  line,
  access,
  dataGroupColour,
  setPopupVisible,
  popupVisible,
}) => {
  const lineData = {
    geometry: {
      coordinates: line.vertices.coordinates,
      type: "LineString",
    },
    id: line.uuid,
    properties: {},
    type: "Feature",
  };
  line.center = turf.pointOnFeature(lineData);

  const lineLayer = (
    <GeoJSONLayer
      key={line.uuid}
      data={lineData}
      linePaint={{
        "line-color": dataGroupColour || "green",
        "line-width": 2,
        "line-opacity": 1,
      }}
      lineOnClick={() => setPopupVisible(line.uuid)}
    />
  );

  if (popupVisible === line.uuid)
    return (
      <>
        {lineLayer}
        <Marker
          key={line.uuid + "2"}
          coordinates={line.center.geometry.coordinates}
          name={line.name}
          description={line.description}
          anchor="bottom"
          style={{
            height: "40px",
            zIndex: popupVisible == line.uuid ? 4 : 3,
            "--data-group-colour": dataGroupColour,
          }}
          onClick={() => {
            if (popupVisible !== line.uuid) setPopupVisible(line.uuid);
          }}
          className={"datagroup-style-wrapper"}
        >
          <DrawingPopup
            object={line}
            type={"line"}
            source={"datagroup"}
            access={access}
            closeDescription={() => setPopupVisible(-1)}
          />
        </Marker>
      </>
    );
  else return lineLayer;
};

export default DataGroupLine;
