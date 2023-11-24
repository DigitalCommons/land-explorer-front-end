import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftPaneInfo from "./LeftPaneInfo";
import LeftPaneLandData from "./LeftPaneLandData";
import LeftPaneDrawingTools from "./LeftPaneDrawingTools";
import LeftPaneRelatedProperties from "./LeftPaneRelatedProperties";
import analytics from "../../analytics";
import { autoSave } from "../../actions/MapActions";
import { isMobile } from "react-device-detect";
import constants from "../../constants";

const LeftPane = ({ drawControl }) => {
  const dispatch = useDispatch();
  const { open, active, activeTool } = useSelector((state) => state.leftPane);
  const readOnly = useSelector((state) => state.readOnly.readOnly);
  const profileMenuOpen = useSelector((state) => state.menu.profile);
  const currentMarker = useSelector((state) => state.markers.currentMarker);
  const activePolygon = useSelector((state) => state.drawings.activePolygon);
  const zoom = useSelector((state) => state.map.zoom);
  const propertyBoundriesZoom = constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL;
  const landOwnershipActive = useSelector(
    (state) => state.landOwnership.displayActive
  );

  const closeTray = () => {
    dispatch({ type: "CLOSE_TRAY" });
  };

  const closePane = () => {
    if (active !== "") {
      dispatch({ type: "CLOSE_TRAY" });

      setTimeout(() => {
        dispatch({ type: "CLOSE_LEFT_PANE" });
      }, 200);
    } else {
      dispatch({ type: "CLOSE_LEFT_PANE" });
    }
  };

  const clickIcon = (tray) => {
    active === tray
      ? dispatch({ type: "CLOSE_TRAY" })
      : dispatch({ type: "SET_ACTIVE", payload: tray });
    // Close profile menu if open and mobile
    if (profileMenuOpen && isMobile) dispatch({ type: "CLOSE_MENU_PROFILE" });
  };

  const handleTrashClick = () => {
    if (activeTool === "edit") {
      const selected = drawControl.draw.getSelected();
      if (selected.features[0]) {
        const id = selected.features[0].id;
        drawControl.draw.delete(id);
        dispatch({
          type: "DELETE_POLYGON",
          payload: id,
        });
        dispatch(autoSave());
      }
    } else if (activePolygon !== null) {
      // Delete the active Polygon
      drawControl.draw.delete(activePolygon);
      dispatch({
        type: "DELETE_POLYGON",
        payload: activePolygon,
      });
      dispatch(autoSave());
    } else if (currentMarker !== null) {
      // Delete the current marker
      dispatch({
        type: "CLEAR_MARKER",
        payload: currentMarker,
      });
      dispatch(autoSave());
    }
  };

  console.log("Is mobile: ", isMobile);

  return (
    <nav>
      <div
        className="toggle-left-pane"
        onClick={() => {
          analytics.event(analytics._event.LEFT_PANE, "Open");
          dispatch({ type: "TOGGLE_LEFT_PANE" });
        }}
      ></div>
      <div
        className="left-pane"
        style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="left-pane-icon close" onClick={closePane} />
        <div
          id="drawing-tools-icon"
          className={`left-pane-icon drawing-tools ${
            active === "Drawing Tools" && "active"
          }`}
          style={{ opacity: readOnly ? 0.5 : 1 }}
          onClick={() => {
            if (!readOnly) {
              analytics.event(analytics._event.LEFT_PANE + " Drawing", "Open");
              clickIcon("Drawing Tools");
            }
          }}
          data-tip
          data-for="ttDrawingTools"
        />
        <div
          className={`left-pane-icon data-layers ${
            active === "Land Data" && "active"
          }`}
          onClick={() => {
            analytics.event(analytics._event.LEFT_PANE + " Land Data", "Open");
            clickIcon("Land Data");
          }}
          data-tip
          data-for="ttLandData"
        />
        <div
          className={`left-pane-icon info ${
            active === "Land Information" && "active"
          }`}
          onClick={() => {
            analytics.event(
              analytics._event.LEFT_PANE + " Land Information",
              "Open"
            );
            clickIcon("Land Information");
          }}
          data-tip
          data-for="ttInfo"
        />
        {/* display land ownership icon only if land ownship layer is active and zoomed-in to sufficient level */}
        {zoom >= propertyBoundriesZoom && landOwnershipActive == true && (
          <div
            className={`left-pane-icon ownership ${
              active === "Ownership Search" && "active"
            }`}
            onClick={() => {
              analytics.event(
                analytics._event.LEFT_PANE + " Ownership Search",
                "Open"
              );
              clickIcon("Ownership Search");
            }}
            data-tip
            data-for="ttRelatedProperties"
          />
        )}
      </div>
      {
        // If not read only, render drawing tools
        !readOnly && (
          <LeftPaneDrawingTools
            active={active}
            open={open}
            onClose={closeTray}
            handleTrashClick={handleTrashClick}
            drawControl={drawControl}
          />
        )
      }
      <LeftPaneLandData open={open} active={active} onClose={closeTray} />
      <LeftPaneInfo
        open={open && active === "Land Information"}
        onClose={closeTray}
      />
      <LeftPaneRelatedProperties
        open={open && active === "Ownership Search"}
        onClose={closeTray}
        itemsPerPage={10}
      />
    </nav>
  );
};

export default LeftPane;
