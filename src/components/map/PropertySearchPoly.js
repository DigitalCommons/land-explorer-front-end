import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Feature, Layer } from "react-mapbox-gl";

const PropertySearchPoly = () => {
  const propertyCoordinates = useSelector(
    (state) => state.propertySearchPoly.propertyCoordinates
  );
  const property = useSelector(
    (state) => state.relatedProperties.selectedProperty
  );

  const coordinates = [
    propertyCoordinates.map((coord) => [coord[1], coord[0]]),
  ];

  const polygonLayer = (
    <Feature coordinates={coordinates} key={property.poly_id} />
  );

  useEffect(() => {
    console.log(
      "Property coordinates  exist!",
      propertyCoordinates,
      property.poly_id
    );
    console.log("Polygon Layer", polygonLayer);
  }, [propertyCoordinates, property.poly_id]);

  // Check if propertyCoordinates exist before rendering GeoJSONLayer
  if (!propertyCoordinates || propertyCoordinates.length === 0) {
    console.log("Property coordinates do not exist!");
    return null;
  }

  return (
    <>
      <Layer
        type={"fill"}
        paint={{
          "fill-color": "red",
          "fill-opacity": 0.3,
          "fill-outline-color": "red",
        }}
      >
        {polygonLayer}
      </Layer>
    </>
  );
};

export default PropertySearchPoly;
