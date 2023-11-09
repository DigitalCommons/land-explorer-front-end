import React from "react";

const Button = ({ buttonClass, type, children, buttonAction }) => {
  return (
    <button className={buttonClass} type={type} onClick={buttonAction}>
      {children}
    </button>
  );
};

export default Button;
