import SurveyList from "./SurveyList";
import { useState, useEffect } from "react";
import API from "../../API";
import Header from "../Header/Header";

export default function Home(props) {
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    API.getSurveys().then((newS) => {
      setSurveys(newS);
    });
  }, [surveys.length]);

  return (
    <div>
      <Header header="List of the Surveys" color="#5E630D" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "1px",
          backgroundColor: "#F2F3DE",
        }}
      >
        <SurveyList surveys={surveys} confirmation={props.confirmation} />
      </div>
    </div>
  );
}
