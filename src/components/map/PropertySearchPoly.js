import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { GeoJSONLayer } from "react-mapbox-gl";

const PropertySearchPoly = ({ property }) => {
  const propertyCoordinates = useSelector(
    (state) => state.propertySearchPoly.propertyCoordinates
  );

  const polyId = useSelector((state) => state.propertySearchPoly.polyId);

  const polygonData = {
    geometry: {
      coordinates: [propertyCoordinates.map((coord) => [coord[1], coord[0]])], //mapbox expects coords as lng,lat
      type: "Polygon",
    },
    id: polyId,
    properties: {},
    type: "Feature",
  };

  const polygonLayer = (
    <GeoJSONLayer
      key={polyId}
      data={polygonData}
      linePaint={{
        "line-color": "red",
        "line-width": 2,
        "line-opacity": 1,
      }}
      fillPaint={{
        "fill-color": "red",
        "fill-opacity": 0.3,
      }}
    />
  );

  useEffect(() => {
    console.log("Property coordinates  exist!", propertyCoordinates, polyId);
    console.log("Polygon Layer", polygonLayer);
  }, [propertyCoordinates, polyId]);

  // Check if propertyCoordinates exist before rendering GeoJSONLayer
  if (!propertyCoordinates || propertyCoordinates.length === 0) {
    console.log("Property coordinates do not exist!");
    return null;
  }

  return <>{polygonLayer}</>;
};

export default PropertySearchPoly;
