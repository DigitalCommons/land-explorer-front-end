import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftPaneTray from "./LeftPaneTray";
import MarkerSection from "./MarkerSection";
import PolygonSection from "./PolygonSection";
import PropertySection from "./PropertySection";
import RelatedPropertySection from "./RelatedPropertySection";
import {
  clearAllSelectedProperties,
  clearAllHighlightedProperties
} from "../../actions/LandOwnershipActions";

const LeftPaneInfo = ({ onClose, open }) => {
  const markers = useSelector((state) => state.markers.markers);
  const polygons = useSelector((state) => state.drawings.polygons);
  const properties = useSelector((state) => state.landOwnership.highlightedProperties);
  const relatedProperties = useSelector((state) => state.relatedProperties.selectedProperties);

  const dispatch = useDispatch();

  const clearAll = () => {
    dispatch(clearAllSelectedProperties());
    dispatch(clearAllHighlightedProperties());
  }

  return (
    <LeftPaneTray title="Land Information" open={open} onClose={onClose}>
      {
        (Object.keys(relatedProperties).length > 0 || Object.keys(properties).length > 0) &&
        <p className="clear-all" onClick={clearAll}>Clear all properties</p>
      }
      {polygons.length ||
        markers.length ||
        Object.keys(properties).length ||
        Object.keys(relatedProperties).length ? (
        <>
          {markers.map((marker, i) => (
            <MarkerSection marker={marker} key={`marker-${i}`} />
          ))}
          {polygons.map((polygon, i) => (
            <PolygonSection polygon={polygon} key={`polygon-${i}`} />
          ))}
          {Object.values(properties).map((property, i) => (
            <PropertySection property={property} key={`property-${i}`} />
          ))}
          {Object.values(relatedProperties).map((property, i) => (
            <RelatedPropertySection property={property} key={`related-property-${i}`} />
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
