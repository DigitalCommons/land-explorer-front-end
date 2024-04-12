import React from "react";
import { Marker, GeoJSONLayer } from "react-mapbox-gl";
import DrawingPopup from "./DrawingPopup/DrawingPopup";
import useStringToClassName from "../../hooks/useStringToClassName";

const DataGroupPolygon = ({
  polygon,
  setPopupVisible,
  popupVisible,
  dataGroupTitle,
}) => {
  const dynamicClass = useStringToClassName(dataGroupTitle);
  const polygonData = {
    geometry: {
      coordinates: polygon.vertices.coordinates,
      type: "Polygon",
    },
    id: polygon.uuid,
    properties: {},
    type: "Feature",
  };

  const polygonLayer = (
    <GeoJSONLayer
      key={polygon.uuid}
      data={polygonData}
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
          "green",
        ],
        "line-width": 2,
        "line-opacity": 1,
      }}
      fillPaint={{
        "fill-color": "green",
        "fill-opacity": 0.05,
      }}
      fillOnClick={() => setPopupVisible(polygon.uuid)}
    />
  );

  if (popupVisible === polygon.uuid)
    return (
      <>
        {polygonLayer}
        <Marker
          key={polygon.uuid + "2"}
          coordinates={polygon.center.coordinates}
          name={polygon.name}
          description={polygon.description}
          anchor="bottom"
          style={{
            height: "40px",
            zIndex: popupVisible == polygon.uuid ? 4 : 3,
          }}
          onClick={() => {
            if (popupVisible !== polygon.uuid) setPopupVisible(polygon.uuid);
          }}
          className={dynamicClass}
        >
          <DrawingPopup
            object={polygon}
            type={"polygon"}
            source={"datagroup"}
            closeDescription={() => setPopupVisible(-1)}
          />
        </Marker>
      </>
    );
  else return polygonLayer;
};

export default DataGroupPolygon;
