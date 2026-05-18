import { MODE } from "../DrawingPopup";
import constants from "../../../../constants";
import iconCopyNew from "../../../../assets/img/icon-copy-new.svg";
import iconEditNew from "../../../../assets/img/icon-edit-new.svg";
import iconCancel from "../../../../assets/img/icon-cancel.svg";
import iconSave from "../../../../assets/img/icon-save.svg";

type Props = {
  mode: string;
  setMode: (mode: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  editObjectInfo: (name: string, description: string) => void;
  name: string;
  setName: (name: string) => void;
  source: string;
  type: string;
  access: any;
  isOnline: boolean;
  readOnly: boolean;
};

const PopupContent = ({
  mode,
  setMode,
  description,
  setDescription,
  editObjectInfo,
  name,
  setName,
  source,
  type,
  access,
  isOnline,
  readOnly,
}: Props) => {
  return (
    <>
      <div className="popup-body-container">
        {mode === MODE.DISPLAY && (
          <>
            <h3 className="popup-title">{name}</h3>
            <div id="popup-body-scroll" className="popup-body-main">
              <p className="description-text">{description}</p>
            </div>
          </>
        )}

        {mode === MODE.EDIT && (
          <>
            <h3
              className="popup-title editable"
              id="popup-name"
              suppressContentEditableWarning={true}
              contentEditable
            >
              {name}
            </h3>
            <div className="popup-body-main">
              <p
                className="description-text editable"
                id="popup-description"
                suppressContentEditableWarning={true}
                contentEditable
              >
                {description}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="popup-footer">
        {mode === MODE.DISPLAY && (
          <>
            <button
              type="button"
              className={`popup-footer-button popup-copy  ${
                !isOnline ? "is-offline" : ""
              }`}
              onClick={() => setMode(MODE.COPY)}
              disabled={!isOnline}
            >
              <img
                src={iconCopyNew}
                className="popup-footer-icon"
              />
              <span className="popup-footer-button-text">Copy to Map</span>
            </button>

            {(source === "map" ||
              access === constants.DATAGROUP_ACCESS_READ_WRITE) && (
              <button
                type="button"
                className={`popup-footer-button popup-edit  ${
                  readOnly ? "is-offline" : ""
                }`}
                onClick={() => setMode(MODE.EDIT)}
                disabled={readOnly}
              >
                <img
                  src={iconEditNew}
                  className="popup-footer-icon"
                />
                <span className="popup-footer-button-text">Edit {type}</span>
              </button>
            )}
          </>
        )}

        {mode === MODE.EDIT && (
          <>
            <button
              type="button"
              className="popup-footer-button popup-copy"
              onClick={() => {
                setName(name);
                setDescription(description);
                setMode(MODE.DISPLAY);
              }}
            >
              <img
                src={iconCancel}
                className="popup-footer-icon"
              />
              Cancel
            </button>

            <button
              type="button"
              className="popup-footer-button popup-save"
              onClick={() => {
                const newName =
                  document.getElementById("popup-name")!.textContent as string;
                const newDescription =
                  document.getElementById("popup-description")!.textContent as string;
                setName(newName);
                setDescription(newDescription);
                setMode(MODE.DISPLAY);
                editObjectInfo(newName, newDescription);
              }}
            >
              <img
                src={iconSave}
                className="popup-footer-icon"
              />
              Save
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PopupContent;
