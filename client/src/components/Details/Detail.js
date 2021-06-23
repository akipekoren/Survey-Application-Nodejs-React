import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import QuestionList from "./QuestionList";
export default function Detail(props) {
  const params = useParams();
  const [survey, setSurvey] = useState("");
  const [errMessage, setError] = useState("");
  useEffect(() => {
    API.getSurvey(params.id).then((newS) => {
      setSurvey(newS);

      if (newS.error) {
        setError("survey not found");
      }
    });
  }, [params.id]);

  return (
    <div
      style={{
        height: "100%",
        border: "1px",
        backgroundColor: "#F2F3DE",
      }}
    >
      {survey.error ? (
        <h1>{errMessage}</h1>
      ) : (
        <QuestionList
          questions={survey.questions}
          title={survey.title}
          surveyid={params.id}
          setConfirmation={props.setConfirmation}
        />
      )}
    </div>
  );
}
