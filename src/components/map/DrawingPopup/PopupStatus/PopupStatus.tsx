import { MODE } from "../DrawingPopup";
import Spinner from "../../../common/Spinner";
import iconTickGreen from "../../../../assets/img/icon-tick--green.svg";
import iconCross from "../../../../assets/img/icon-cross.svg";

type Props = {
  mode: string;
  selectedMap: any;
  selectedDataGroup: any;
  type: string;
};

const PopupStatus = ({ mode, selectedMap, selectedDataGroup, type }: Props) => {
  let text = "";
  let iconSrc = "";

  if (mode === MODE.SUCCESS) {
    text = `${
      type.slice(0, 1).toUpperCase() + type.slice(1)
    } successfully copied to`;
    iconSrc = iconTickGreen;
  } else if (mode === MODE.ERROR) {
    text = `Unable to copy ${type} to`;
    iconSrc = iconCross;
  } else if (mode === MODE.SAVING) {
    text = `Copying ${type} to`;
  }

  return (
    <div className="popup-copy-status-container">
      <p className="popup-copy-status-text">
        {text}
        <br />
        {selectedMap && `'${selectedMap.name}'`}
        {selectedDataGroup && `'${selectedDataGroup.title}'`}
      </p>
      {mode != MODE.SAVING ? (
        <img src={iconSrc} className="popup-status-icon" />
      ) : (
        <Spinner className="popup-status-icon" />
      )}
    </div>
  );
};

export default PopupStatus;
