import React from "react";
import { useSelector } from "react-redux";
import LeftPaneTray from "./LeftPaneTray";
import MarkerSection from "./MarkerSection";
import PolygonSection from "./PolygonSection";
import PropertySection from "./PropertySection";

const LeftPaneInfo = ({ onClose, open }) => {
  const markers = useSelector((state) => state.markers.markers);
  const polygons = useSelector((state) => state.drawings.polygons);
  const properties = useSelector(
    (state) => state.landOwnership.highlightedProperties
  );
  const otherProperties = useSelector(
    (state) => state.relatedProperties.properties
  );

  return (
    <LeftPaneTray title="Land Information" open={open} onClose={onClose}>
      {polygons.length || markers.length || properties.length ? (
        <>
          {markers.map((marker, i) => (
            <MarkerSection marker={marker} key={`marker-${i}`} />
          ))}
          {polygons.map((polygon, i) => (
            <PolygonSection polygon={polygon} key={`polygon-${i}`} />
          ))}
          {properties.map((property, i) => (
            <PropertySection property={property} key={`property-${i}`} />
          ))}
          {otherProperties.map((property, i) => (
            <PropertySection property={property} key={`property-${i}`} />
          ))}
        </>
      ) : (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          No drawn objects or selected properties.
        </div>
      )}
    </LeftPaneTray>
  );
};

export default LeftPaneInfo;
