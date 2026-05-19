import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import LeftPaneInfo from "./LeftPaneInfo";
import LeftPaneLandData from "./LeftPaneLandData";
import LeftPaneDrawingTools from "./LeftPaneDrawingTools";
import LeftPaneRelatedProperties from "./LeftPaneRelatedProperties";
import { autoSave } from "../../actions/MapActions";
import { isMobile } from "react-device-detect";

type Props = {
  drawControl: any;
};

const LeftPane = ({ drawControl }: Props) => {
  const dispatch = useAppDispatch();
  const { open, active, activeTool } = useAppSelector((state) => state.leftPane);
  const readOnly = useAppSelector((state) => state.readOnly.readOnly);
  const profileMenuOpen = useAppSelector((state) => state.menu.profile);
  const currentMarker = useAppSelector((state) => state.markers.currentMarker);
  const activeDrawing = useAppSelector((state) => state.drawings.activeDrawing);
  const relatedProperties = useAppSelector(
    (state) => state.landOwnership.relatedProperties
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

  const clickIcon = (tray: string) => {
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
          type: "DELETE_DRAWING",
          payload: id,
        });
        dispatch(autoSave());
      }
    } else if (activeDrawing !== null) {
      // Delete the active drawing
      drawControl.draw.delete(activeDrawing);
      dispatch({
        type: "DELETE_DRAWING",
        payload: activeDrawing,
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

  return (
    <nav>
      <div
        className="toggle-left-pane"
        onClick={() => {
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
          onClick={() => clickIcon("Land Data")}
          data-tip
          data-for="ttLandData"
        />
        <div
          className={`left-pane-icon info ${
            active === "Land Information" && "active"
          }`}
          onClick={() => clickIcon("Land Information")}
          data-tip
          data-for="ttInfo"
        />
        <div
          style={{
            /* display ownership search icon only if search is not empty */
            display:
              Object.keys(relatedProperties).length > 0 ||
              active === "Ownership Search"
                ? "block"
                : "none",
          }}
          className={`left-pane-icon ownership ${
            active === "Ownership Search" && "active"
          }`}
          onClick={() => clickIcon("Ownership Search")}
          data-tip
          data-for="ttRelatedProperties"
        />
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
