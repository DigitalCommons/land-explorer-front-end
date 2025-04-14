import React from "react";

const PropertySectionHeader = ({
  address,
  polyId,
  titleNo,
  onClickRemove,
  open,
}) => {
  return (
    <div className="property-section-header">
      <h4 className="property-section-header__address">
        {address ? address : `Property ${polyId}`}
      </h4>
      <div className="property-section-header__title-no">
        Title no: {titleNo}
      </div>
      <a className="property-section-header__remove" onClick={onClickRemove}>
        Remove Property
      </a>
      <div className="property-section-header__chevron">
        <img
          src={require("../../../../assets/img/icon-chevron.svg")}
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
