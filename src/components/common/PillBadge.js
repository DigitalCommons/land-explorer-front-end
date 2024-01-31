import React from "react";
import Button from "./Button";

const PillBadge = ({ title, remove, iconClass, customClass, key }) => {
  return (
    <div className={`pill-badge ${customClass ? customClass : ""}`} key={key}>
      {iconClass && (
        <i className={"pill-badge__icon"}><span className={iconClass}></span></i>
      )}
      <div className="pill-badge__title">{title}</div>
      {remove && (
        <Button
          buttonClass={"pill-badge__remove"}
          type={"button"}
          buttonAction={remove}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
            <path d="M10 1.007 8.993 0 5 3.993 1.007 0 0 1.007 3.993 5 0 8.993 1.007 10 5 6.007 8.993 10 10 8.993 6.007 5Z" />
          </svg>
        </Button>
      )}
    </div>
  );
};

export default PillBadge;
