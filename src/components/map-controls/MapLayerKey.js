import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import Key from "./Key";
import constants from "../../constants";

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

 const layers = {
    "provisional-agricultural-land-ab795l": {
      name: "Agricultural land classification",
      data: {
        "Grade 1": "#3980d0",
        "Grade 2": "#10c3ef",
        "Grade 3": "#0fb08f",
        "Grade 4": "#f9f90d",
        "Grade 5": "#c9748e",
        Exclusion: "#b2b2b2",
        "Non Agricultural": "#b2b2b2",
        Urban: "#b2b2b2",
      },
    },
    "national-forest-estate-soil-g-18j2ga": {
      name: "National forest estate soils",
      data: {
        "Basin Bog": "#b2b2b2",
        "Brown Earth": "#895c44",
        "Calcareous Soil": "#4de600",
        "Eroded Bog": "#9c9c9c",
        "Flat or Raised Bogs": "#686868",
        "Flushed Blanket Bog": "#333333",
        "Ground-water Gley": "#014ea6",
        "Ironpan Soil": "#fc5601",
        "Littoral Soil": "#fefe67",
        "Man-made Soil": "#ab00e5",
        "Peaty Surface-water Gley": "#0085a8",
        Podzol: "#e60002",
        "Skeletal Soil": "#e7e600",
        "Surface-water Gley": "#00a8e7",
        "Unflushed Blanket Bog": "#010101",
        "Valley Complex": "#8d8ead",
      },
    },
    "historic-flood-map-5y05ao": {
      name: "Historic flood map",
      data: {
        Flood: "hsl(196, 80%, 70%)",
      },
    },
    "sites-of-special-scientific-i-09kaq4": {
      name: "Sites of scientific interest",
      data: {
        "Site of Interest": "hsl(1, 40%, 40%)",
      },
    },
    "special-protection-areas-engl-71pdjg": {
      name: "Special protection areas",
      data: {
        "Protection Area": "hsl(51, 40%, 40%)",
      },
    },
    "special-areas-of-conservation-bm41zr": {
      name: "Special areas of conservation",
      data: {
        "Conservation Area": "hsl(101, 40%, 40%)",
      },
    },
    "ncc-brownfield-sites": {
      name: "Brownfield",
      data: {
        Brownfield: "hsla(0, 24%, 20%, 0.5)",
      },
    },
    "local-authority-greenbelt-bou-9r44t6": {
      name: "Greenbelt",
      data: {
        Greenbelt: "hsla(113, 97%, 50%, 0.4)",
      },
    },
    "wards-cu4dni": {
      name: "Wards",
      data: {
        Wards: "hsl(245, 100%, 50%)",
      },
    },
    "county-4ef4ik": {
      name: "Counties",
      data: {
        Counties: "hsla(113, 97%, 50%, 0.4)",
      },
    },
    "westminster_const_region-8r33ph": {
      name: "Westminster Constituencies",
      data: {
        Constituencies: "hsl(183, 97%, 50%)",
      },
    },
    "district_borough_unitary_regi-bquzqt": {
      name: "Councils",
      data: {
        Councils: "hsl(56, 97%, 50%)",
      },
    },
    parish: {
      name: "Parishes",
      data: {
        Parish: "hsl(280,60%,70%)",
      },
    },
    "devolved-powers": {
      name: "Devolved Powers",
      data: {
        "Devolved Powers": "hsl(320,97%,50%)",
      },
    },
    all: {
      name: "Land Ownership",
      data: {
        "Company owned": {
          fill: "#BE4A9766",
          border: "#BE4A97",
        },
        "Privately owned": {
          fill: "#39ABB366",
          border: "#39ABB3",
        },
      },
      hasBorder: true,
    },
    localAuthority: {
      name: "Land Ownership",
      data: {
        "Local Authority": {
          fill: "#BE4A9766",
          border: "#BE4A97",
        },
      },
    },
    churchOfEngland: {
      name: "Land Ownership",
      data: {
        "Church of England": {
          fill: "#BE4A9766",
          border: "#BE4A97",
        },
      },
    },
    pending: {
      name: "Pending Properties",
      data: {
        "Pending Properties": "#FF9900",
      },
    },
    highlightedProperty: {
      name: "Selected Properties",
      data: {
        "Selected Property": { fill: "#24467366", border: "#24467366" },
        "Active Property": {
          fill: "#24467399",
          border: "#24467399",
          borderStyle: "dashed",
        },
      },
    },
  };

  const getKeys = () => {
    const keys = [];

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

    if (hasHighlightedProperties) {
      keys.push(
        <Key
          key="highlighted-properties"
          name={layers.highlightedProperty.name}
          data={layers.highlightedProperty.data}
        />
      );
    }

    return keys;
  };

  const allKeys = getKeys();

  const renderKeyContent = () =>
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
                {renderKeyContent()}
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
            <div className="tooltip-menu-key-content">{renderKeyContent()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapLayerKey;
