import { useState, useEffect } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import CreateForm from "./CreateForm";
import QuestionName from "../Details/QuestionName";
import Answers from "../Details/Answers";
import API from "../../API";
import { useHistory } from "react-router-dom";
import {
  faTrash,
  faPlus,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Create() {
  let history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");

  const [userId, setUserId] = useState();

  // multiple question
  const [show, setShow] = useState(false);
  const handleMultipleQuestionShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show2, setShow2] = useState(false);
  const handleOpenQuestionShow = () => setShow2(true);
  const handleClose2 = () => setShow2(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    API.getUserInfo().then((newU) => {
      setUserId(newU.id);
    });
    handleClose();
  }, []);

  const handleUp = (id) => {
    var index = 0;
    var precessor;
    var successor;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].id === id) {
        break;
      } else {
        index = index + 1;
      }
    }

    if (index === 0) {
      return;
    }

    precessor = questions[index - 1];
    successor = questions[index];

    setQuestions((prevQuestions) => {
      let data = [...prevQuestions];
      data[index - 1] = successor;
      data[index] = precessor;
      return data;
    });
  };

  const handleDown = (id) => {
    var index = 0;

    var precessor;
    var successor;

    for (var i = 0; i < questions.length; i++) {
      if (questions[i].id === id) {
        break;
      } else {
        index = index + 1;
      }
    }
    if (index === questions.length - 1) {
      return;
    }

    precessor = questions[index];
    successor = questions[index + 1];

    setQuestions((prevQuestions) => {
      let data = [...prevQuestions];
      data[index] = successor;
      data[index + 1] = precessor;
      return data;
    });
  };

  const deleteQuestion = (questionId) => {
    setQuestions((oldQuestions) =>
      oldQuestions.filter((q) => q.id !== questionId)
    );
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrMessage("");

    if (title) {
      if (questions.length > 0) {
        var surveyObj = {
          title: title,
          questions: questions,
          user: userId,
        };

        API.postSurvey(surveyObj).then(() => {
          history.push("/surveys");
        });
      }
      setErrMessage("Please add questions to complete survey!");
    } else {
      setErrMessage("Please add title to survey!");
    }
  };

  console.log(errMessage);
  return (
    <>
      <div
        style={{
          height: "100%",
          border: "1px",
          backgroundColor: "#F2F3DE",
        }}
      >
        {errMessage ? <Alert variant="danger">{errMessage}</Alert> : ""}

        <form className="mt-5">
          <div style={{ borderStyle: "dotted" }}>
            <label>Title of Survey</label>
            <input
              style={{ width: "500px", textAlign: "center", margin: "auto" }}
              name={title}
              type="text"
              className="form-control"
              value={title}
              onChange={handleChange}
              placeholder="Enter title"
            />
            <Button
              style={{
                borderRadius: "22px",
                boxShadow:
                  "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                backgroundColor: "gray",
              }}
              onClick={handleMultipleQuestionShow}
              className="add-btn mt-5 mb-4"
              data-toggle="modal"
            >
              Create Multiple Choice Question
            </Button>

            <Button
              style={{
                borderRadius: "22px",
                boxShadow:
                  "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                backgroundColor: "gray",
              }}
              onClick={handleOpenQuestionShow}
              className="add-btn ml-2 mt-5 mb-4"
              data-toggle="modal"
            >
              {" "}
              Create Open Ended Question
            </Button>
          </div>

          {questions.map((question) => (
            <div key={question.id}>
              <div style={{ position: "relative" }}>
                <QuestionName
                  name={question.name}
                  mandatory={question.mandatory}
                />
                <div
                  style={{ position: "absolute", right: "100px", top: "75" }}
                >
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    onClick={() => {
                      handleUp(question.id);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    onClick={() => {
                      handleDown(question.id);
                    }}
                  />
                </div>
              </div>
              <Answers
                answers={question.answers}
                type={question.type}
                multiSelect={question.multiselect}
              />

              <button
                type="button"
                className="btn btn-danger mt-3"
                onClick={() => deleteQuestion(question.id)}
              >
                Delete Question <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
          <hr />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary mt-3"
          >
            Create Survey <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Multiple Choice Question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CreateForm
            type="multi"
            setQuestions={setQuestions}
            questions={questions}
            handleClose={handleClose}
            handleClose2={handleClose2}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Create Open Ended Question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CreateForm
            type="text"
            setQuestions={setQuestions}
            questions={questions}
            handleClose={handleClose}
            handleClose2={handleClose2}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
