import React from "react";

const Button = ({ type, buttonAction }) => {
  return (
    <button className="btn-primary" type={type} onClick={buttonAction}>
      {children}
    </button>
  );
};

export default Button;
