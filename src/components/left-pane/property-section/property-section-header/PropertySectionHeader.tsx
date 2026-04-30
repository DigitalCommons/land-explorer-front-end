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
        <div className="property-section-header__title-no">
          Title no: {title_no.startsWith("unknown_") ? "Unknown" : title_no}
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
