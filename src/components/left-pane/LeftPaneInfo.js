import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftPaneTray from "./LeftPaneTray";
import MarkerSection from "./MarkerSection";
import PolygonSection from "./PolygonSection";
import PropertySection from "./property-section/PropertySection";
import { clearAllHighlightedProperties } from "../../actions/LandOwnershipActions";
import TabHeader from "../common/TabHeader";
import { use } from "react";

const LeftPaneInfo = ({ onClose, open }) => {
  const markers = useSelector((state) => state.markers.markers);
  const polygons = useSelector((state) => state.drawings.polygons);
  const { highlightedProperties, relatedProperties } = useSelector(
    (state) => state.landOwnership
  );

  const savedProperties =
    useSelector((state) => state.landOwnership?.savedProperties) || {};
  const dispatch = useDispatch();

  // local UI state for tabs
  const [activeTab, setActiveTab] = useState("selected");

  const tabs = useMemo(() => {
    return [
      { key: "selected", label: "Selected" },
      { key: "saved", label: "Saved" },
      { key: "drawings", label: "My Drawings" },
    ];
  }, []);

  const hasSelected =
    Object.keys(highlightedProperties).length > 0 ||
    Object.keys(relatedProperties).length > 0;
  const hasSaved = Object.keys(savedProperties).length > 0;
  const hasDrawings =
    (polygons && polygons.length) || (markers && markers.length);

  const clearAll = () => {
    dispatch(clearAllHighlightedProperties());
  };

  console.log("hasSelected", hasSelected, highlightedProperties);
  console.log("hasSaved", hasSaved, savedProperties);
  console.log("hasDrawings", hasDrawings, { polygons, markers });

  return (
    <LeftPaneTray title="Land Information" open={open} onClose={onClose}>
      <TabHeader tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {(Object.keys(relatedProperties).length > 0 ||
        Object.keys(highlightedProperties).length > 0) && (
        <p className="clear-all" onClick={clearAll}>
          Clear all properties
        </p>
      )}

      {/* Selected Tab */}
      {activeTab === "selected" && (
        <div>
          {hasSelected ? (
            <>
              {Object.values(highlightedProperties).map((property, i) => (
                <PropertySection property={property} key={`property-${i}`} />
              ))}
            </>
          ) : (
            <div>No selected properties.</div>
          )}
        </div>
      )}

      {/* Saved Tab */}
      {activeTab === "saved" && (
        <div>
          {hasSaved ? (
            <>
              {Object.values(savedProperties).map((property, i) => (
                <PropertySection property={property} key={`property-${i}`} />
              ))}
            </>
          ) : (
            <div>No saved properties.</div>
          )}
        </div>
      )}

      {/* Drawings Tab */}
      {activeTab === "drawings" && (
        <div>
          {hasDrawings ? (
            <>
              {markers.map((marker, i) => (
                <MarkerSection marker={marker} key={`marker-${i}`} />
              ))}
              {polygons.map((polygon, i) => (
                <PolygonSection polygon={polygon} key={`polygon-${i}`} />
              ))}
            </>
          ) : (
            <div>No drawn objects.</div>
          )}
        </div>
      )}
    </LeftPaneTray>
  );
};

export default LeftPaneInfo;
