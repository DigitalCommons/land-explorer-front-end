import { useAppDispatch, useAppSelector } from '@/hooks/react-redux';

// Import tool icons (regular and active/white versions)
import iconDropPin from '../../assets/img/icon-drop-pin.svg';
import iconDropPinWhite from '../../assets/img/icon-drop-pin--white.svg';
import iconPolygon from '../../assets/img/icon-polygon.svg';
import iconPolygonWhite from '../../assets/img/icon-polygon--white.svg';
import iconLine from '../../assets/img/icon-line.svg';
import iconLineWhite from '../../assets/img/icon-line--white.svg';
import iconEdit from '../../assets/img/icon-edit.svg';
import iconEditWhite from '../../assets/img/icon-edit--white.svg';

const toolIcons = {
  "drop-pin": { default: iconDropPin, white: iconDropPinWhite },
  polygon: { default: iconPolygon, white: iconPolygonWhite },
  line: { default: iconLine, white: iconLineWhite },
  edit: { default: iconEdit, white: iconEditWhite },
};

type Props = {
  tool: keyof typeof toolIcons;
  name: string;
  mode: string | null;
  size?: string;
  drawControl: any;
  active?: boolean;
};

const DrawingTool = ({ tool, name, mode, size, drawControl }: Props) => {
  const dispatch = useAppDispatch();
  const activeTool = useAppSelector((state) => state.leftPane.activeTool);
  const activeDrawing = useAppSelector((state) => state.drawings.activeDrawing);

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
        if (activeDrawing) {
          console.log("Active drawing:", activeDrawing);
          // change to direct_select and set the featureId to the active polygon
          drawControl.draw.changeMode("direct_select", {
            featureId: activeDrawing,
          });
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

  const image = isToolActive ? toolIcons[tool].white : toolIcons[tool].default;

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
          backgroundImage: `url("${image}")`,
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
