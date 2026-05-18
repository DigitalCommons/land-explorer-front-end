import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import iconChevron from "../../../../assets/img/icon-chevron.svg";

type Props = {
  address: string | null;
  title_no: string;
  onClickRemove: () => void;
  open: boolean;
  unregistered: boolean;
};

const PropertySectionHeader = ({
  address,
  title_no,
  onClickRemove,
  open,
  unregistered,
}: Props) => {
  const [showCopiedIcon, setShowCopiedIcon] = useState(false);

  useEffect(() => {
    if (!showCopiedIcon) return;
    const id = setTimeout(() => setShowCopiedIcon(false), 2000);
    return () => clearTimeout(id);
  }, [showCopiedIcon]);

  const handleOnCopyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(title_no);
      setShowCopiedIcon(true);
    } catch (err) {
      console.error("Failed to copy title number: ", err);
    }
  };

  return (
    <div className="property-section-header">
      <h4 className="property-section-header__address">
        {address
          ? address
          : unregistered
            ? `Unregistered Land ${title_no}`
            : `Property ${title_no.replace("unknown_", "")}`}
      </h4>
      {!unregistered && (
        <div className="property-section-header__title-no-section">
          <div className="property-section-header__title-no">
            Title no: {title_no.startsWith("unknown_") ? "Unknown" : title_no}
          </div>
          <div className="property-section-header__copy-section">
            <button
              className="property-section-header__copy-button"
              onClick={handleOnCopyClick}
            >
              Copy
              <FontAwesomeIcon
                className="property-section-header__copy-icon"
                style={showCopiedIcon ? { color: "green" } : {}}
                icon={showCopiedIcon ? faCheck : faCopy}
              />
            </button>
          </div>
        </div>
      )}
      <a className="property-section-header__remove" onClick={onClickRemove}>
        Remove Property
      </a>
      <div className="property-section-header__chevron">
        <img
          src={iconChevron}
          alt=""
          style={{
            transformOrigin: "center",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </div>
    </div>
  );
};

export default PropertySectionHeader;
