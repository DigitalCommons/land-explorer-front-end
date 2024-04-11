import React from "react";
import { Marker, GeoJSONLayer } from "react-mapbox-gl";
import DrawingPopup from "./DrawingPopup/DrawingPopup";
import * as turf from "@turf/turf";
import useStringToClassName from "../../hooks/useStringToClassName";

const DataGroupLine = ({
  line,
  setPopupVisible,
  popupVisible,
  dataGroupTitle,
}) => {
  const dynamicClass = useStringToClassName(dataGroupTitle);
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

  // const linePaintData =
  //   dynamicClass === "allotments"
  //     ? {
  //         "line-color": "red",
  //         "line-width": 2,
  //         "line-opacity": 1,
  //       }
  //     : {
  //         "line-color": "green",
  //         "line-width": 2,
  //         "line-opacity": 1,
  //       };

  // const lineColor = dynamicClass === "allotments" ? "red" : "green";

  // const linePaintData = {
  //   "line-color": lineColor,
  //   "line-width": 2,
  //   "line-opacity": 1,
  // };

  const lineLayer = (
    <GeoJSONLayer
      key={line.uuid}
      data={lineData}
      // linePaint={linePaintData}
      linePaint={{
        "line-color": [
          "case",
          ["==", dynamicClass, "allotments"],
          "#8EA637",
          ["==", dynamicClass, "community-gardens"],
          "#165F8C",
          ["==", dynamicClass, "csa-community-farms"],
          "#403116",
          ["==", dynamicClass, "incredible-edible"],
          "#BF800B",
          ["==", dynamicClass, "orchards"],
          "#BF573F",
          "green", // fallback color
        ],
        "line-width": 2,
        "line-opacity": 1,
      }}
      lineOnClick={() => setPopupVisible(line.uuid)}
    />
  );

  console.log("Datagroup title for line layer", dataGroupTitle);

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
          }}
          onClick={() => {
            if (popupVisible !== line.uuid) setPopupVisible(line.uuid);
          }}
        >
          <DrawingPopup
            object={line}
            type={"line"}
            source={"datagroup"}
            closeDescription={() => setPopupVisible(-1)}
          />
        </Marker>
      </>
    );
  else return lineLayer;
};

export default DataGroupLine;
