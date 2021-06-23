import Question from "./Question";
import { useState, useEffect } from "react";
import API from "../../API";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
export default function QuestionList(props) {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const [answersToSurvey, setAnswersToSurvey] = useState([]);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName) {
      setErrMessage("User name can not be empty!");
      return;
    }

    var flag = false;
    answersToSurvey.map((answer) => {
      if (answer.mandatory && answer.answers === "") {
        flag = true;
      }
    });

    if (flag === true) {
      setErrMessage("Some of the mandatory fields are empty!!");
      return;
    }

    const resObj = {
      username: userName,
      surveyid: props.surveyid,
      answers: answersToSurvey,
    };

    API.postResponse(resObj).then(() => {
      history.push("/surveys");
      props.setConfirmation("Your answers are sucessfully recorded");
    });
  };

  useEffect(() => {
    if (props.questions) {
      props.questions.forEach((element) => {
        if (element.type === "multi" && element.multiselect === false) {
          const qA = {
            id: element.id,
            answers: element.answers[0],
            mandatory: element.mandatory,
          };
          setAnswersToSurvey((oldAnswers) => [...oldAnswers, qA]);
        } else {
          const qA = {
            id: element.id,
            answers: "",
            mandatory: element.mandatory,
          };
          setAnswersToSurvey((oldAnswers) => [...oldAnswers, qA]);
        }
      });
    }
  }, [props]);

  return (
    <div className="mt-5">
      <h1
        style={{
          fontFamily: "monospace",
          textTransform: "uppercase",
          fontSize: 60,
          color: "#5C5E35",
          textShadow: "0 2px white, 0 3px #777",
          marginLeft: "355px",
        }}
      >
        {" "}
        <i>{props.title}</i>
      </h1>

      <div className="mt-5" style={{ marginLeft: "355px", maxWidth: "760px" }}>
        {errMessage ? (
          <Alert variant="danger" style={{ width: "50%" }}>
            {errMessage}
          </Alert>
        ) : (
          ""
        )}
        <form>
          <h4
            style={{ fontFamily: "sans-serif", fontSize: 20, color: "#5C5E35" }}
          >
            {" "}
            <i>Before we start, please enter your name</i>
          </h4>
          <input
            style={{ width: "50%", height: "25px" }}
            onChange={handleChange}
          ></input>
          {props.questions ? (
            props.questions.map((question) => (
              <Question
                key={question.id}
                question={question}
                setAnswersToSurvey={setAnswersToSurvey}
                answersToSurvey={answersToSurvey}
              />
            ))
          ) : (
            <h1></h1>
          )}
        </form>
        <button
          style={{
            marginTop: "30px",
            marginBottom: "60px",
            marginLeft: "150px",
          }}
          onClick={handleSubmit}
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
}
