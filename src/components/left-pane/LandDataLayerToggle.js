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

  // Determine if the layer is currently active
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
