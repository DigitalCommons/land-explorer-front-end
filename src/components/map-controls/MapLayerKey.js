import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import Key from "./Key";
import constants from "../../constants";
import layers from "../../data/mapLayerKeyConfig";

const ownershipLayers = ["all", "localAuthority", "churchOfEngland", "pending"];

const MapLayerKey = ({ open, setOpen }) => {
  const [expanded, setExpanded] = useState(true);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [mobileAnimating, setMobileAnimating] = useState(false);

  const landDataLayers = useSelector((state) => state.mapLayers.landDataLayers);
  const { zoom } = useSelector((state) => state.map);
  const { activeDisplay, highlightedProperties } = useSelector(
    (state) => state.landOwnership
  );

  // Check if there are highlighted properties
  const hasHighlightedProperties =
    Object.keys(highlightedProperties).length > 0;

  // Check if the map is at the ownership zoom level
  const isAtOwnershipZoom =
    activeDisplay &&
    zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[activeDisplay];

  // Check which layers are visible based on the zoom level
  const visibleLayerIds = landDataLayers.filter((id) =>
    ownershipLayers.includes(id) ? isAtOwnershipZoom : true
  );

  // Check if there are ownership layers that are not visible
  const hasOwnershipLayersButNotVisible = landDataLayers.some(
    (id) => ownershipLayers.includes(id) && !visibleLayerIds.includes(id)
  );

  // Auto-expand when an ownership layer is toggled ON after all were OFF
  useEffect(() => {
    if (!expanded && activeDisplay) {
      setExpanded(true);
    }
  }, [activeDisplay]);

  // Handle mobile animations
  useEffect(() => {
    if (!isMobile) return;

    if (open) {
      setMobileVisible(true);
      setTimeout(() => setMobileAnimating(true), 50);
    } else {
      setMobileAnimating(false);
      setTimeout(() => setMobileVisible(false), 300);
    }
  }, [open]);

  // Handle close mobile
  const handleCloseMobile = () => {
    setMobileAnimating(false);
    setTimeout(() => {
      setOpen(false);
      setMobileVisible(false);
    }, 300);
  };

  // Render keys based on visible layers
  const getKeys = () => {
    const keys = [];

    // Show land ownership layers
    if (
      activeDisplay &&
      ownershipLayers.includes(activeDisplay) &&
      layers[activeDisplay]
    ) {
      keys.push(
        <Key
          key={`ownership-${activeDisplay}`}
          name={layers[activeDisplay].name}
          data={layers[activeDisplay].data}
        />
      );
    }

    // Show highlighted properties
    if (hasHighlightedProperties && layers.highlightedProperty) {
      keys.push(
        <Key
          key="highlighted-properties"
          name={layers.highlightedProperty.name}
          data={layers.highlightedProperty.data}
        />
      );
    }

    // Show all other non-ownership visible layers
    visibleLayerIds
      .filter((id) => !ownershipLayers.includes(id))
      .forEach((id) => {
        const layer = layers[id];
        if (layer) {
          keys.push(<Key key={id} name={layer.name} data={layer.data} />);
        } else {
          console.warn(`Missing definition for layer ${id}`);
          keys.push(<Key key={id} name={`Layer: ${id}`} data={{}} />);
        }
      });

    return keys;
  };

  const allKeys = getKeys();

  // Render the key content
  const renderVisibleKeys = () =>
    allKeys.length ? (
      allKeys
    ) : (
      <div>
        {hasOwnershipLayersButNotVisible
          ? "Ownership layers will become visible when you zoom in further"
          : "No Layers selected"}
      </div>
    );

  return (
    <>
      {isMobile ? (
        mobileVisible && (
          <div
            className="tooltip-menu-key__container mobile-key"
            style={{
              transform: mobileAnimating ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <div className="tooltip-menu-key">
              <header className="tooltip-menu-key__header">
                <i className="tooltip-menu-key__icon"></i>
                <h3>Layer Key</h3>
                <div
                  className="button-clear tooltip-menu-key__close"
                  onClick={handleCloseMobile}
                >
                  <i
                    className="modal-close__dark-grey"
                    style={{ top: 0, right: 0 }}
                  ></i>
                </div>
              </header>
              <div className="tooltip-menu-key-content">
                {renderVisibleKeys()}
              </div>
            </div>
          </div>
        )
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
            <div className="tooltip-menu-key-content">{renderVisibleKeys()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapLayerKey;
