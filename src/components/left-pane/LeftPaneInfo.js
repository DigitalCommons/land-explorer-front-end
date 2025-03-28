import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftPaneTray from "./LeftPaneTray";
import MarkerSection from "./MarkerSection";
import PolygonSection from "./PolygonSection";
import PropertySection from "./property-section/PropertySection";
import { clearAllHighlightedProperties } from "../../actions/LandOwnershipActions";

const LeftPaneInfo = ({ onClose, open }) => {
  const markers = useSelector((state) => state.markers.markers);
  const polygons = useSelector((state) => state.drawings.polygons);
  const { highlightedProperties, relatedProperties } = useSelector(
    (state) => state.landOwnership
  );

  const dispatch = useDispatch();

  const clearAll = () => {
    dispatch(clearAllHighlightedProperties());
  };

  return (
    <LeftPaneTray title="Land Information" open={open} onClose={onClose}>
      {(Object.keys(relatedProperties).length > 0 ||
        Object.keys(highlightedProperties).length > 0) && (
        <p className="clear-all" onClick={clearAll}>
          Clear all properties
        </p>
      )}
      {polygons.length ||
      markers.length ||
      Object.keys(highlightedProperties).length ||
      Object.keys(relatedProperties).length ? (
        <>
          {markers.map((marker, i) => (
            <MarkerSection marker={marker} key={`marker-${i}`} />
          ))}
          {polygons.map((polygon, i) => (
            <PolygonSection polygon={polygon} key={`polygon-${i}`} />
          ))}
          {Object.values(highlightedProperties).map((property, i) => (
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
