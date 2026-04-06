import { autoSave } from "../../actions/MapActions";
import LeftPaneToggle from "./LeftPaneToggle";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";

type Props = {
  title: string;
  layerId: string;
  draggable?: boolean;
};

const LandDataLayerToggle = ({ title, layerId, draggable = false }: Props) => {
  const dispatch = useAppDispatch();
  const activeLayers = useAppSelector(
    (state) => state.landDataLayers.landDataLayers
  );

  const onToggle = () => {
    dispatch({ type: "TOGGLE_LAND_DATA_LAYER", payload: layerId });
    dispatch(autoSave());
  };

  return (
    <LeftPaneToggle
      title={title}
      on={activeLayers.includes(layerId)}
      onToggle={onToggle}
      draggable={draggable}
    />
  );
};

export default LandDataLayerToggle;
