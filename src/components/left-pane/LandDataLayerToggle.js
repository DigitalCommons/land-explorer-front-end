// src/components/left-pane/LandDataLayerToggle.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoSave } from "../../actions/MapActions";
import LeftPaneToggle from "./LeftPaneToggle";

const LandDataLayerToggle = ({
  title,
  layerId,
  draggable = false,
  on = null,
  onToggle = null,
}) => {
  const dispatch = useDispatch();
  const activeLayers = useSelector((state) => state.mapLayers.landDataLayers);

  // Use provided "on" prop or fall back to checking activeLayers
  const isOn = on !== null ? on : activeLayers.includes(layerId);

  // #361 - Default toggle handler
  const defaultToggle = () => {
    console.log(`Default toggle for ${layerId}`);
    dispatch({ type: "TOGGLE_LAYER", payload: layerId });
    dispatch(autoSave());
  };

  // Use provided onToggle or the default one
  const handleToggle = onToggle || defaultToggle;

  return (
    <LeftPaneToggle
      title={title}
      on={isOn}
      onToggle={handleToggle}
      draggable={draggable}
    />
  );
};

export default LandDataLayerToggle;
