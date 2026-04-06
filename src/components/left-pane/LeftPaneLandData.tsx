import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import LeftPaneTray from "./LeftPaneTray";
import LeftPaneToggle from "./LeftPaneToggle";
import Draggable from "./Draggable";
import LandDataLayerToggle from "./LandDataLayerToggle";
import { toggleDataGroup } from "../../actions/DataGroupActions";
import { togglePropertyDisplay } from "../../actions/LandOwnershipActions";
import LeftPaneNotification from "./left-pane-notification/LeftPaneNotification";
import iconChevron from "../../assets/img/icon-chevron.svg";

type DataLayersContainerProps = {
  children: React.ReactNode;
  title: string;
};

const DataLayersContainer = ({ children, title }: DataLayersContainerProps) => {
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
            src={iconChevron}
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

type Props = {
  open: boolean;
  active: string;
  onClose: () => void;
};

const LeftPaneLandData = ({ open, active, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const userGroupTitlesAndIDs = useAppSelector(
    (state) => state.dataGroups.userGroupTitlesAndIDs
  );
  const dataGroups = useAppSelector((state) => state.dataGroups.dataGroupsData);
  const activeGroups = useAppSelector((state) => state.dataGroups.activeGroups);
  const landOwnershipActiveDisplay = useAppSelector(
    (state) => state.landOwnership.activeDisplay
  );

  const description = (
    <p className="land-data-description">
      Want to add your own data to Land Explorer?{" "}
      <a href="https://landexplorer.coop/#contact" target="_blank">
        Contact Us.
      </a>
    </p>
  );

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
      <DataLayersContainer title={"Land Ownership"}>
        <LeftPaneNotification
          notificationId="landOwnershipData"
          notificationType="warning"
          content={
            <>
              Land ownership data may be out of date. Please verify critical
              information through a{" "}
              <a
                href="https://search-property-information.service.gov.uk/search/search-by-title-number"
                target="_blank"
                rel="noopener noreferrer"
              >
                Land Registry search.
              </a>
            </>
          }
        />
        <LeftPaneToggle
          title={"All Properties"}
          on={landOwnershipActiveDisplay === "all"}
          onToggle={() => dispatch(togglePropertyDisplay("all"))}
        />
        {user.privileged && (
          <LeftPaneToggle
            title={"Pending Properties"}
            on={landOwnershipActiveDisplay === "pending"}
            onToggle={() => dispatch(togglePropertyDisplay("pending"))}
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
        />
        <LeftPaneToggle
          title={"Social Housing"}
          on={landOwnershipActiveDisplay === "socialHousing"}
          onToggle={() => dispatch(togglePropertyDisplay("socialHousing"))}
          disclaimer={true}
          disclaimerContent={
            <>
              This layer is based on registered social housing providers in
              England and Wales. Note that local authorities can also provide
              social housing, and these won't be included in the layer.
            </>
          }
        />
        <LeftPaneToggle
          title="Unregistered Land"
          on={landOwnershipActiveDisplay === "unregistered"}
          onToggle={() => dispatch(togglePropertyDisplay("unregistered"))}
        />
      </DataLayersContainer>
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
                    style={{ "--data-group-colour": dataGroup.hex_colour } as React.CSSProperties}
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
