import React from "react";

export default function Header(props) {
  return (
    <div
      className="text-center"
      style={{
        background: props.color,
        padding: "25px",
        marginTop: "100px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ color: "white" }}>{props.header}</h1>
    </div>
  );
}
