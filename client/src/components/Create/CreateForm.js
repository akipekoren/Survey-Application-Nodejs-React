import { Form, Button } from "react-bootstrap";

import { useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CreateForm(props) {
  const [answerArray, setAnswerArrray] = useState([]);
  const [inputAnswer, setInputAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnswerSubmit = (e) => {
    e.preventDefault();

    setAnswerArrray((oldAnswers) => [...oldAnswers, inputAnswer]);
    setInputAnswer("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (answerArray.length === 0 && props.type === "multi") {
      setErrorMessage("Please add at least one choice to continue");
      return;
    }
    var mulAns = false;

    if (multiselect === 0 || multiselect === "0") {
      mulAns = false;
    } else {
      mulAns = true;
    }

    var man;
    if (mandatory === 0 || mandatory === "0") {
      man = false;
    } else {
      man = true;
    }

    const curr_id = props.questions.length + 1;

    const t = {
      id: curr_id,
      name: name,
      mandatory: man,
      multiselect: mulAns,
      type: props.type,
      answers: answerArray.slice(0),
    };

    props.setQuestions((oldQuestions) => [...oldQuestions, t]);
    props.handleClose();
    props.handleClose2();
  };

  const [newQuestion, setNewQuestion] = useState({
    id: "",
    name: "",
    mandatory: "0",
    multiselect: "0",
    type: "",
    answers: [],
  });

  const onInputChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setInputAnswer(e.target.value);
  };

  const { name, mandatory, multiselect, answers } = newQuestion;

  return (
    <>
      {props.type === "multi" ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Question Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />

            <Form.Control
              as="select"
              name="mandatory"
              value={mandatory}
              onChange={(e) => onInputChange(e)}
              required
              className="mt-3"
            >
              <option value="0">Optional</option>
              <option value="1">Mandatory</option>
            </Form.Control>

            <Form.Control
              as="select"
              name="multiselect"
              value={multiselect}
              onChange={(e) => onInputChange(e)}
              required
              className="mt-3"
            >
              <option value="0">Single Choice</option>
              <option value="1">Multiple Choice</option>
            </Form.Control>

            <form className="mt-3">
              <label>
                Add Choice *:
                <input
                  className="ml-1"
                  type="text"
                  value={inputAnswer}
                  onChange={handleChange}
                />
              </label>
              <button className="ml-1" onClick={handleAnswerSubmit}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </form>

            <h6 className="mt-3">Possible Choices : </h6>
            {answerArray.map((ans) => (
              <li key={ans}>{ans} </li>
            ))}
          </Form.Group>
          <small style={{ color: "red" }}>{errorMessage}</small>
          <Button variant="success" type="submit" block className="mt-3">
            Create
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Question Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
            <Form.Control
              as="select"
              placeholder="Optinal"
              name="mandatory"
              value={mandatory}
              onChange={(e) => onInputChange(e)}
              required
              className="mt-3"
            >
              <option value="0">Optional</option>
              <option value="1">Mandatory</option>
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit" block className="mt-3">
            Create
          </Button>
        </Form>
      )}
    </>
  );
}
