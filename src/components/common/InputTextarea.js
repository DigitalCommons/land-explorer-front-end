import React from 'react'

const InputTextarea = ({ label, name, rows, error, errorClassName }) => {
  const id = "textarea-" + name;

  
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        onChange={() => {}}
        onBlur={() => {}}
        className="form-textarea"
      />
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
}

export default InputTextarea