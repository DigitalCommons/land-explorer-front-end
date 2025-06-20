import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import Key from "./Key";
import constants from "../../constants";

const MenuKey = ({ open, setOpen }) => {
  const landDataLayers = useSelector((state) => state.mapLayers.landDataLayers);
  const { zoom, zooming } = useSelector((state) => state.map);
  const { activeDisplay } = useSelector((state) => state.landOwnership);
  const dispatch = useDispatch();

  // #361 - Define ownership layer IDs
  const ownershipLayers = [
    "all",
    "localAuthority",
    "churchOfEngland",
    "pending",
  ];

  // #361 - Determine if we're at the appropriate zoom level for ownership layers
  const isAtOwnershipZoom =
    activeDisplay &&
    zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[activeDisplay];

  console.log("landDataLayers", landDataLayers);
  console.log(
    "Current zoom:",
    zoom,
    "Ownership zoom threshold:",
    activeDisplay
      ? constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[activeDisplay]
      : "N/A"
  );

  // #361 - Filter layers based on zoom level
  const visibleLayerIds = landDataLayers.filter((layerId) => {
    // If it's an ownership layer, only show at appropriate zoom
    if (ownershipLayers.includes(layerId)) {
      return isAtOwnershipZoom;
    }
    // Otherwise always show
    return true;
  });

  // #361 - Check if only ownership layers are active
  const onlyHasOwnershipLayers =
    landDataLayers.length > 0 &&
    landDataLayers.every((id) => ownershipLayers.includes(id));

  const shouldShowMenuKeyButton =
    // Show if there are any non-ownership layers active
    !onlyHasOwnershipLayers ||
    // OR if we're at the ownership zoom level
    (onlyHasOwnershipLayers && isAtOwnershipZoom);

  // Then update the menu key button rendering
  <div
    className="menu-key-button"
    style={{ display: shouldShowMenuKeyButton ? "block" : "none" }}
    onClick={() => setOpen(!open)}
  />;

  // #361 - Check if only ownership layers are active
  useEffect(() => {
    // Force a re-render when zoom changes if we have ownership layers
    const hasOwnershipLayers = landDataLayers.some((id) =>
      ownershipLayers.includes(id)
    );

    if (hasOwnershipLayers) {
      // Important - debounced or throttled in production
      // to prevent too many re-renders during zoom operations
      console.log("Zoom changed, checking ownership layer visibility");
    }
  }, [zoom, landDataLayers]);

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
        "Company owned": "#BE4A97",
        "Privately owned": "#39ABB3",
      },
    },
    localAuthority: {
      name: "Land Ownership",
      data: {
        "Local Authority": "#BE4A97",
      },
    },
    churchOfEngland: {
      name: "Land Ownership",
      data: {
        "Church of England": "#BE4A97",
      },
    },
    pending: {
      name: "Pending Properties",
      data: {
        "Pending Properties": "#FF9900",
      },
    },
  };

  // #361 - Create the keys using the filtered layer IDs
  const keys = visibleLayerIds.map((layer, i) => (
    <Key key={i} name={layers[layer].name} data={layers[layer].data} />
  ));

  // #361 - Determine if we should show the key at all
  const hasVisibleLayers = visibleLayerIds.length > 0;
  const shouldShowKey = open && hasVisibleLayers;

  console.log("key open", open, "visible layers:", visibleLayerIds.length);

  return (
    <>
      {/* <div className="menu-key-button" onClick={() => setOpen(!open)} /> */}
      {isMobile ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: "scroll",
            background: "white",
            zIndex: 10000000,
            display: shouldShowKey ? "block" : "none",
          }}
          className="mobile-key"
        >
          <div
            style={{
              position: "fixed",
              top: "24px",
              right: "24px",
            }}
            onClick={() => setOpen(false)}
          >
            <img
              style={{ height: "16px", width: "16px" }}
              src={require("../../assets/img/icon-close-new.svg")}
              alt=""
            />
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
              boxSizing: "border-box",
              padding: "24px",
              paddingTop: "0px",
            }}
          >
            <h2>Layer Key</h2>
            {keys.length ? keys : <div>No Layers selected</div>}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: shouldShowKey ? "block" : "none",
          }}
          className="desktop-key"
        >
          <button onClick={() => {}}>Close tab</button>
          <div
            className="tooltip-menu tooltip-menu-key modal desktop"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            >
              <header className="tooltip-menu-key__header">
                <i className="tooltip-menu-layers__icon"></i>
                <h3 style={{ marginTop: 0 }}>Layer Key</h3>
              </header>
            <div className="tooltip-menu-key-content">
              
              {keys.length ? keys : <div>No Layers selected</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuKey;
