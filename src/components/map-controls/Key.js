import React from "react";

const Key = ({ data, name }) => (
  <div
    style={{
      marginBottom: "15px",
    }}
  >
    <div
      style={{
        display: "inline-block",
        marginTop: 0,
        marginBottom: 0,
        color: "#27ae60",
        fontSize: "14px",
        height: "14px",
      }}
    >
      {name}
    </div>
    <div
      style={{
        width: "100%",
        marginBottom: "12px",
      }}
    />
    {Object.keys(data).map((key, i) => {
      /**
       * Check if the color value is an object with fill/border or just a string
       * If it's an object, extract the fill and border properties
       */
      const isColorObject = typeof data[key] === "object" && data[key] !== null;
      const backgroundColor = isColorObject ? data[key].fill : data[key];
      const borderColor = isColorObject ? data[key].border : "transparent";
      const borderStyle =
        isColorObject && data[key].borderStyle
          ? data[key].borderStyle
          : "solid";

      return (
        <div
          key={i}
          style={{
            display: "flex",
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: isColorObject ? "2px" : "0",
              borderStyle: isColorObject ? borderStyle : "none",
              opacity: "1",
              height: "16px",
              width: "50px",
              marginRight: "6px",
            }}
          />
          <div style={{ fontSize: "14px" }}>{key}</div>
        </div>
      );
    })}
  </div>
);

export default Key;
