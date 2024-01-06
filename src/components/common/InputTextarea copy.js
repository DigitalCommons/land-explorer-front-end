import React, { useCallback } from "react";

const InputTextarea = ({ label, name, error, onChange, ...inputProps }) => {
  const id = "textarea-" + name;

  // const handleChange = useCallback(
  //   (e) => {
  //     if (inputProps?.onChange) {
  //       inputProps.onChange(e);
  //     }
  //   },
  //   [inputProps]
  // );

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        onChange={onChange}
        onBlur={(e) => {
          inputProps?.onBlur?.(e);
        }}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default InputTextarea;

// const InputTextarea = ({
//   label,
//   name,
//   rows,
//   error,
//   validation,
//   onBlur,
//   ...inputProps
// }) => {
//   const id = "textarea-" + name;

//   const handleChange = useCallback(
//     (e) => {
//       if (inputProps?.onChange) {
//         inputProps.onChange(e);
//       }
//     },
//     [inputProps]
//   );

//   const handleBlur = useCallback((e) => {
//     if (error && inputProps?.onBlur) {
//       inputProps.onBlur(e);
//     }
//   }, []);

//   console.log("InputTextarea", inputProps);
//   console.log("InputTextarea", error);

//   return (
// <div className="form-group">
//   <label htmlFor={id} className="form-label">
//     {label}
//   </label>
//   <textarea
//     id={id}
//     name={name}
//     rows={rows}
//     onChange={(e) => handleChange(e)}
//     onBlur={(e) => {
//       handleBlur(e);
//       validation?.();
//     }}
//     className="form-textarea"
//   />
//   {error && <span className="error">{error}</span>}
// </div>
//   );
// };

// export default InputTextarea;
