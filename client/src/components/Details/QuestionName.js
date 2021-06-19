import React from "react";

export default function QuestionName(props) {
  return (
    <div>
      <hr />
      {props.mandatory ? (
        <h4
          style={{ fontFamily: "sans-serif", fontSize: 20, color: "#5C5E35" }}
        >
          <i> {props.name}</i>
        </h4>
      ) : (
        <div>
          <h4
            style={{ fontFamily: "sans-serif", fontSize: 20, color: "#5C5E35" }}
          >
            <i>{props.name} </i>{" "}
          </h4>{" "}
          <h5>
            {" "}
            <i style={{ fontSize: 15 }}>(Optional)</i>
          </h5>
        </div>
      )}
    </div>
  );
}
