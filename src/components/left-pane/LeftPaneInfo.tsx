import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import LeftPaneTray from "./LeftPaneTray";
import MarkerSection from "./MarkerSection";
import DrawingSection from "./DrawingSection";
import PropertySection from "./property-section/PropertySection";
import { clearAllHighlightedProperties } from "../../actions/LandOwnershipActions";

type Props = {
  onClose: () => void;
  open: boolean;
};

const LeftPaneInfo = ({ onClose, open }: Props) => {
  const markers = useAppSelector((state) => state.markers.markers);
  const drawings = useAppSelector((state) => state.drawings.drawings);
  const { highlightedProperties, relatedProperties, activePropertyTitleNo } =
    useAppSelector((state) => state.landOwnership);
  const highlightedCount = Object.keys(highlightedProperties).length;
  const activePropertyRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

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
              <div ref={activePropertyRef} key={`property-${title_no}`}>
                <PropertySection property={property} />
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
