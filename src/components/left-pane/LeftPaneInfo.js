import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftPaneTray from "./LeftPaneTray";
import MarkerSection from "./MarkerSection";
import DrawingSection from "./DrawingSection";
import PropertySection from "./property-section/PropertySection";
import { clearAllHighlightedProperties } from "../../actions/LandOwnershipActions";

const LeftPaneInfo = ({ onClose, open }) => {
  const markers = useSelector((state) => state.markers.markers);
  const drawings = useSelector((state) => state.drawings.drawings);
  const { highlightedProperties, relatedProperties, activePropertyTitleNo } =
    useSelector((state) => state.landOwnership);
  const highlightedCount = Object.keys(highlightedProperties).length;
  const activePropertyRef = useRef(null);

  const dispatch = useDispatch();

  // Scroll to the active property
  useEffect(() => {
    if (open && activePropertyTitleNo) {
      activePropertyRef.current?.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }
  }, [highlightedCount, activePropertyTitleNo, open]);

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
      {drawings.length ||
      markers.length ||
      Object.keys(highlightedProperties).length ||
      Object.keys(relatedProperties).length ? (
        <>
          {markers.map((marker, i) => (
            <MarkerSection marker={marker} key={`marker-${i}`} />
          ))}
          {drawings.map((drawing, i) => (
            <DrawingSection drawing={drawing} key={`drawing-${i}`} />
          ))}
          {Object.entries(highlightedProperties).map(([title_no, property]) =>
            title_no === activePropertyTitleNo ? (
              <div ref={activePropertyRef}>
                <PropertySection
                  property={property}
                  key={`property-${title_no}`}
                />
              </div>
            ) : (
              <PropertySection
                property={property}
                key={`property-${title_no}`}
              />
            )
          )}
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
