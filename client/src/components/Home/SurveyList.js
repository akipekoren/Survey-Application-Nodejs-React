import React from "react";
import Survey from "./Survey";
import { Alert } from "react-bootstrap";
export default function SurveyList(props) {
  return (
    <div style={{ marginTop: "50px" }}>
      {props.confirmation ? (
        <Alert variant="success">{props.confirmation}</Alert>
      ) : (
        ""
      )}
      {props.surveys.map((survey) => (
        <Survey key={survey.id} survey={survey} />
      ))}
    </div>
  );
}
