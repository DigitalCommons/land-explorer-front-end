import React from "react";

const InputTextarea = ({
  label,
  name,
  errorText,
  errorCondition,
  ...inputProps
}) => {
  const id = "textarea-" + name;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        {...inputProps}
        id={id}
        name={name}
        className={`form-textarea${
          errorCondition ? " form-textarea--error" : ""
        }`}
        placeholder={errorCondition ? errorText : inputProps.placeholder}
      />
    </div>
  );
};

export default InputTextarea;
