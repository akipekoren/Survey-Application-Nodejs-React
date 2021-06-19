import React from "react";
import QuestionName from "./QuestionName";
import Answers from "./Answers";
export default function Question(props) {
  return (
    <div>
      <QuestionName
        name={props.question.name}
        mandatory={props.question.mandatory}
      />
      <Answers
        answersToSurvey={props.answersToSurvey}
        setAnswersToSurvey={props.setAnswersToSurvey}
        answers={props.question.answers}
        type={props.question.type}
        multiSelect={props.question.multiselect}
        id={props.question.id}
        mandatory={props.question.mandatory}
      />
    </div>
  );
}
