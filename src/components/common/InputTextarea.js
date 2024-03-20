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
        className="form-textarea"
      />
      {errorCondition && <span className="error">{errorText}</span>}
    </div>
  );
};

export default InputTextarea;
