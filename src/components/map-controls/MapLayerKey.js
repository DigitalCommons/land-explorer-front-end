import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import Key from "./Key";
import layers from "../../data/mapLayerKeyConfig";

const MapLayerKey = () => {
  const { landDataLayers } = useSelector((state) => state.mapLayers);
  const { activeDisplay, highlightedProperties } = useSelector(
    (state) => state.landOwnership
  );

  const [expanded, setExpanded] = useState(true);
  const [prevActiveDisplay, setPrevActiveDisplay] = useState(activeDisplay);
  const [prevLandDataLayers, setPrevLandDataLayers] = useState(landDataLayers);

  // Check if there are highlighted properties
  const hasHighlightedProperties =
    Object.keys(highlightedProperties).length > 0;

  // Auto-expand when an ownership/land data layer is toggled ON after all were OFF
  useEffect(() => {
    if (
      (prevActiveDisplay === null && activeDisplay) ||
      (prevLandDataLayers.length === 0 && landDataLayers.length)
    ) {
      setExpanded(true);
    }
    setPrevActiveDisplay(activeDisplay);
    setPrevLandDataLayers(landDataLayers);
  }, [activeDisplay, landDataLayers]);

  // Render keys based on visible layers
  const visibleLayerIds = (activeDisplay ? [activeDisplay] : [])
    .concat(hasHighlightedProperties ? ["highlightedProperty"] : [])
    .concat(landDataLayers);

  const keyContent = visibleLayerIds
    .map((id) => {
      if (!layers[id]) {
        console.warn(`Missing definition for layer ${id}`);
        return null;
      }

      const { data, name } = layers[id];

      // Skip if no data is available for the layer
      if (!data || Object.keys(data).length === 0) {
        return null;
      }

      return <Key key={id} name={name} data={data} />;
    })
    .filter((element) => element !== null);

  return (
    <>
      {isMobile ? (
        <>
          <button
            className="menu-key-button"
            onClick={() => setExpanded(!expanded)}
            aria-label="Toggle Layer Key"
            data-tip
            data-for="ttToggleLayerKey"
          >
            <i className="tooltip-menu-key__icon"></i>
          </button>
          <div
            className="tooltip-menu-key__container mobile-key"
            style={{
              transform: expanded ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <div className="tooltip-menu-key">
              <header className="tooltip-menu-key__header">
                <i className="tooltip-menu-key__icon"></i>
                <h3>Layer Key</h3>
                <div
                  className="button-clear tooltip-menu-key__close"
                  onClick={() => setExpanded(!expanded)}
                >
                  <i
                    className="modal-close__dark-grey"
                    style={{ top: 0, right: 0 }}
                  ></i>
                </div>
              </header>
              <div className="tooltip-menu-key-content">{keyContent}</div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`tooltip-menu-key__container ${
            !expanded ? "collapsed" : ""
          }`}
          style={{ display: "flex" }}
        >
          <button
            className={`tooltip-menu-key__tab ${!expanded ? "collapsed" : ""}`}
            onClick={() => setExpanded(!expanded)}
            data-tip
            data-for={"ttToggleLayerKey"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.142 16">
              <path d="M8.807 7.193a1.144 1.144 0 0 1 0 1.617l-6.855 6.855a1.144 1.144 0 1 1-1.617-1.617L6.383 8 .339 1.952A1.144 1.144 0 1 1 1.956.335L8.811 7.19Z" />
            </svg>
          </button>
          <div
            className="tooltip-menu-key modal desktop"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <header className="tooltip-menu-key__header">
              <i className="tooltip-menu-key__icon"></i>
              <h3 style={{ marginTop: 0 }}>Layer Key</h3>
            </header>
            <div className="tooltip-menu-key-content">{keyContent}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapLayerKey;
