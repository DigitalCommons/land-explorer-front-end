import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftPaneTray from "./LeftPaneTray";
import LeftPaneToggle from "./LeftPaneToggle";
import Draggable from "./Draggable";
import LandDataLayerToggle from "./LandDataLayerToggle";
import { toggleDataGroup } from "../../actions/DataGroupActions";
import { togglePropertyDisplay } from "../../actions/LandOwnershipActions";
import constants from "../../constants";
import { autoSave } from "../../actions/MapActions";

const DataLayersContainer = ({ children, title }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <div
        className="data-section-title"
        onClick={() => setExpanded(!expanded)}
      >
        <h4 style={{ fontWeight: "bold" }}>{title}</h4>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "12px",
            width: "24px",
            height: "24px",
            textAlign: "center",
          }}
        >
          <img
            src={require("../../assets/img/icon-chevron.svg")}
            alt=""
            style={{
              transformOrigin: "center",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </div>
      {expanded && children}
    </div>
  );
};

const LeftPaneLandData = ({ open, active, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const userGroupTitlesAndIDs = useSelector(
    (state) => state.dataGroups.userGroupTitlesAndIDs
  );
  const dataGroups = useSelector((state) => state.dataGroups.dataGroupsData);
  const activeGroups = useSelector((state) => state.dataGroups.activeGroups);
  const landOwnershipActiveDisplay = useSelector(
    (state) => state.landOwnership.activeDisplay
  );
  // Add this to your other useSelector calls
  const activeLayers = useSelector((state) => state.mapLayers.landDataLayers);

  const description = (
    <p className="land-data-description">
      Want to add your own data to Land Explorer?{" "}
      <a href="https://landexplorer.coop/#contact" target="_blank">
        Contact Us.
      </a>
    </p>
  );

  const handleOwnershipToggle = (display) => {
    return () => {
      console.log(`OWNERSHIP TOGGLE for ${display}`);

      // First toggle the property display state
      dispatch(togglePropertyDisplay(display));

      // Then make sure it's in the MenuKey by toggling the layer
      dispatch({ type: "TOGGLE_LAYER", payload: display });

      // For "all" specifically, let's ensure the visibility is updated
      if (display === "all") {
        // If turning on "all"
        if (landOwnershipActiveDisplay !== "all") {
          console.log("Ensuring 'all' layer is visible");
          // You might need another action to specifically make the layer visible
          // This depends on how your map rendering code checks for layer visibility
          dispatch({
            type: "ENSURE_LAYER_VISIBLE",
            payload: "all",
          });
        }
        // If turning off "all"
        else {
          console.log("Ensuring 'all' layer is hidden");
          dispatch({
            type: "ENSURE_LAYER_HIDDEN",
            payload: "all",
          });
        }
      }

      dispatch(autoSave());
    };
  };

  console.log("Active Layers:", activeLayers);

  return (
    <LeftPaneTray
      title="Data Layers"
      open={open && active === "Land Data"}
      onClose={onClose}
      header={description}
    >
      <DataLayersContainer title={"Land Data"}>
        <Draggable itemHeight={58}>
          <LandDataLayerToggle
            draggable
            title="Agricultural land classification"
            layerId="provisional-agricultural-land-ab795l"
          />
          <LandDataLayerToggle
            draggable
            title="National Forest Estate soils"
            layerId="national-forest-estate-soil-g-18j2ga"
          />
          <LandDataLayerToggle
            draggable
            title="Historic flood map"
            layerId="historic-flood-map-5y05ao"
          />
          <LandDataLayerToggle
            draggable
            title="Sites of special scientific interest"
            layerId="sites-of-special-scientific-i-09kaq4"
          />
          <LandDataLayerToggle
            draggable
            title="Special protection areas"
            layerId="special-protection-areas-engl-71pdjg"
          />
          <LandDataLayerToggle
            draggable
            title="Special areas of conservation"
            layerId="special-areas-of-conservation-bm41zr"
          />
          <LandDataLayerToggle
            draggable
            title="Greenbelt"
            layerId="local-authority-greenbelt-bou-9r44t6"
          />
          <LandDataLayerToggle
            draggable
            title="Brownfield"
            layerId="ncc-brownfield-sites"
          />
        </Draggable>
      </DataLayersContainer>
      {constants.LR_POLYGONS_ENABLED && (
        <DataLayersContainer title={"Land Ownership"}>
          <LandDataLayerToggle
            title="All Properties"
            layerId="all"
            on={landOwnershipActiveDisplay === "all"}
            onToggle={handleOwnershipToggle("all")}
          />
          {user.privileged && (
            <LandDataLayerToggle
              title="Pending Properties"
              layerId="pending"
              on={landOwnershipActiveDisplay === "pending"}
              onToggle={handleOwnershipToggle("pending")}
            />
          )}
          <LandDataLayerToggle
            title="Local Authority"
            layerId="localAuthority"
            on={landOwnershipActiveDisplay === "localAuthority"}
            onToggle={handleOwnershipToggle("localAuthority")}
          />
          <LandDataLayerToggle
            title="Church of England"
            layerId="churchOfEngland"
            on={landOwnershipActiveDisplay === "churchOfEngland"}
            onToggle={handleOwnershipToggle("churchOfEngland")}
          />

          {/* <LeftPaneToggle
            title={"All Properties"}
            on={landOwnershipActiveDisplay === "all"}
            onToggle={() => dispatch(togglePropertyDisplay("all"))}
            layerId="all"
          /> */}
          {/* {user.privileged && (
            <LeftPaneToggle
              title={"Pending Properties"}
              on={landOwnershipActiveDisplay === "pending"}
              // onToggle={() => dispatch(togglePropertyDisplay("pending"))}
            />
          )}
          <LeftPaneToggle
            title={"Local Authority"}
            on={landOwnershipActiveDisplay === "localAuthority"}
            onToggle={() => dispatch(togglePropertyDisplay("localAuthority"))}
          />
          <LeftPaneToggle
            title={"Church of England"}
            on={landOwnershipActiveDisplay === "churchOfEngland"}
            onToggle={() => dispatch(togglePropertyDisplay("churchOfEngland"))}
          /> */}
        </DataLayersContainer>
      )}
      <DataLayersContainer title={"Administrative Boundaries"}>
        <LandDataLayerToggle title="Wards" layerId="wards-cu4dni" />
        <LandDataLayerToggle title="Parishes" layerId="parish" />
        <LandDataLayerToggle
          title="Local Councils"
          layerId="district_borough_unitary_regi-bquzqt"
        />
        <LandDataLayerToggle
          title="Parliamentary Constituencies"
          layerId="westminster_const_region-8r33ph"
        />
        <LandDataLayerToggle
          title="Devolved Powers"
          layerId="devolved-powers"
        />
        <LandDataLayerToggle title="Counties" layerId="county-4ef4ik" />
      </DataLayersContainer>
      {userGroupTitlesAndIDs &&
        userGroupTitlesAndIDs.map((userGroup) => (
          <DataLayersContainer title={userGroup.title} key={userGroup.id}>
            {dataGroups &&
              dataGroups
                .filter((dataGroup) => dataGroup.userGroupId == userGroup.id)
                .map((dataGroup) => (
                  <div
                    className={"datagroup-style-wrapper"}
                    style={{ "--data-group-colour": dataGroup.hex_colour }}
                    key={dataGroup.id}
                  >
                    <LeftPaneToggle
                      title={dataGroup.title}
                      on={activeGroups.includes(dataGroup.id)}
                      onToggle={() => dispatch(toggleDataGroup(dataGroup.id))}
                    />
                  </div>
                ))}
          </DataLayersContainer>
        ))}
    </LeftPaneTray>
  );
};

export default LeftPaneLandData;
