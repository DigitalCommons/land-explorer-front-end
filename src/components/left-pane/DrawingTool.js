import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DrawingTool = ({ tool, name, mode, size, drawControl }) => {
  const dispatch = useDispatch();
  const activeTool = useSelector((state) => state.leftPane.activeTool);
  const activePolygon = useSelector((state) => state.drawings.activePolygon);
  const activeMarker = useSelector((state) => state.markers.currentMarker);

  const isToolActive = activeTool === tool;

  const handleClick = () => {
    // If you click on a tool you have selected deselect it
    if (isToolActive) {
      dispatch({
        type: "DESELECT_TOOLS",
      });
      setTimeout(() => {
        drawControl.draw.changeMode("static");
      }, 100);
    } else {
      // Else set the tool as active
      dispatch({
        type: "SET_ACTIVE_TOOL",
        payload: tool,
      });
      if (mode === "simple_select") {
        // if a polygon has been selected in the UI
        if (activePolygon) {
          // change to direct_select and set the featureId to the active polygon
          drawControl.draw.changeMode("direct_select", {
            featureId: activePolygon,
          });
        } else if (activeMarker) {
          // change to direct_select and set the featureId to the active polygon
          drawControl.draw.changeMode("direct_select", {
            featureId: activeMarker,
          });
          console.log("activeMarker", activeMarker);
        } else {
          // change to the specific drawing mode
          drawControl.draw.changeMode(mode);
        }
      } else if (mode) {
        // change to the specific drawing mode
        drawControl.draw.changeMode(mode);
      }
    }
  };

  const image = require(`../../assets/img/icon-${tool}${
    isToolActive ? "--white" : ""
  }.svg`);

  return (
    <div
      className={`drawing-tool-section ${isToolActive ? "active" : ""}`}
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className={`drawing-tool ${isToolActive ? "active" : ""}`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: size ? size : "40%",
          width: "72px",
          display: "inline-block",
        }}
      ></div>
      <div
        style={{
          display: "inline-block",
          userSelect: "none",
          color: isToolActive ? "white" : "#78838f",
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default DrawingTool;
