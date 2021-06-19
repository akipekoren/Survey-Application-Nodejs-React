import React from "react";
import { Link } from "react-router-dom";
export default function Survey(props) {
  return (
    <div
      className="text-center mt-4"
      style={{
        width: "600px",
        height: "80px",
        background: "#F7F5F5",
        border: "1px solid #050505",
        borderRadius: "50px",
        marginBottom: "30px",
      }}
    >
      <h4 style={{ fontFamily: "fantasy", marginTop: "12px" }}>
        {props.survey.title}{" "}
      </h4>{" "}
      <i>
        <small style={{ color: "gray" }}>
          {" "}
          ( {props.survey.questions.length} questions )
        </small>{" "}
      </i>
      <small>
        <Link to={"/surveys/" + props.survey.id}>Go to Survey </Link>
      </small>
    </div>
  );
}
