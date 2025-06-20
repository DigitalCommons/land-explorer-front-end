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
              backgroundColor: data[key],
              borderColor: data[key],
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
