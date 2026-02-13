import React from "react";

const Button = ({ buttonClass, type, children, buttonAction, ...buttonProps }) => {
  return (
    <button {...buttonProps} className={buttonClass} type={type} onClick={buttonAction}>
      {children}
    </button>
  );
};

export default Button;
