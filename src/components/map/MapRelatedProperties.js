import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Feature, Layer } from "react-mapbox-gl";
import { setActiveProperty } from "../../actions/LandOwnershipActions";

/** GeoJSON layer containing related properties found when searching by owner. */
const MapRelatedProperties = () => {
  const dispatch = useDispatch();

  const { selectedProperties } = useSelector(state => state.relatedProperties)

  const handlePolygonClick = (property) => {
    dispatch(setActiveProperty(property.poly_id));
    console.log("Polygon clicked!", property.poly_id);
  };

  const polygonLayer = Object.values(selectedProperties).map(property => <Feature
    coordinates={[property.geom.coordinates[0].map((coord) => [coord[1], coord[0]])]}
    key={property.poly_id}
    onClick={() => handlePolygonClick(property)}
  />)

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

export default MapRelatedProperties;
