import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import constants from "../../constants";
import { setZoom } from "../../actions/MapActions";

type Props = {
  show: boolean;
};

const ZoomWarning = ({ show }: Props) => {
  const dispatch = useAppDispatch();

  const { zooming } = useAppSelector((state) => state.map);
  const propertiesDisplay = useAppSelector(
    (state) => state.landOwnership.activeDisplay
  );

  // Determine required zoom level
  const requiredZoomLevel = propertiesDisplay
    ? constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[propertiesDisplay as keyof typeof constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS]
    : constants.LAND_DATA_LAYER_ZOOM_LEVEL;

  return (
    <div
      onClick={() => {
        if (!zooming) {
          dispatch(setZoom([requiredZoomLevel]));
        }
      }}
      className="zoom-warning-button"
      style={{
        transform: show ? "translateY(0px)" : "translateY(-12px)",
        opacity: show ? 1 : 0,
      }}
    >
      <span>Zoom in to see layer</span>
      <i className="zoom-warning-button__icon"></i>
    </div>
  );
};

export default ZoomWarning;
