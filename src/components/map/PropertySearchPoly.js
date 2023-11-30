import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Feature, Layer } from "react-mapbox-gl";
import { setActiveProperty } from "../../actions/LandOwnershipActions";

const PropertySearchPoly = () => {
  const dispatch = useDispatch();

  const { selectedProperty } = useSelector(state => state.relatedProperties)

  console.log("prop", selectedProperty)

  const handlePolygonClick = (property) => {
    dispatch(setActiveProperty(property.poly_id));
    console.log("Polygon clicked!", property.poly_id);
  };

  const polygonLayer = selectedProperty.map(property => <Feature
    coordinates={[property[0].geom.coordinates[0].map((coord) => [coord[1], coord[0]])]}
    key={property[0].poly_id}
    onClick={() => handlePolygonClick(property[0])}
  />)

  // Check if propertyCoordinates exist before rendering GeoJSONLayer
  if (!selectedProperty || selectedProperty.length === 0) {
    console.log("Property coordinates do not exist!");
    return null;
  }

  console.log(polygonLayer)

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
