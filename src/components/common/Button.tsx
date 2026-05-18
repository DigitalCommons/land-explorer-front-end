import React from "react";

type Props = {
  buttonClass?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  buttonAction?: React.MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
};

const Button = ({ buttonClass, type, children, buttonAction, ...buttonProps }: Props) => {
  return (
    <button {...buttonProps} className={buttonClass} type={type} onClick={buttonAction}>
      {children}
    </button>
  );
};

export default Button;
