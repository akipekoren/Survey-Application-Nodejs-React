import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header/Header";
export default function Response() {
  const params = useParams();
  const [responses, setResponses] = useState([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    API.getResponses(params.id).then((newS) => {
      setResponses(newS);
    });
  }, [responses.length, params.id, index]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#F2F3DE",
          border: "2px solid",
          marginTop: "-3px",
        }}
      >
        {responses[index] ? (
          <>
            <Header
              header={"Responses for " + responses[0].title}
              color="#5E630D"
            />{" "}
            <ul style={{ listStyleType: "none", marginLeft: "400px" }}>
              <li style={{ fontSize: "30px" }}>
                {" "}
                <b> Username :</b>
                {responses[index].username}{" "}
              </li>
              <br />
              {responses[index].answers.map((answer, idx) => (
                <>
                  <li key={idx}>
                    {" "}
                    <b> Question : {idx + 1}</b>{" "}
                    {responses[index].questions[idx].name}
                    <b> Answer : </b>{" "}
                    {responses[index].answers[idx].answers.split("?").join(" ")}
                  </li>
                </>
              ))}
            </ul>
          </>
        ) : (
          <h1></h1>
        )}

        <FontAwesomeIcon
          className="mr-5 fa-2x"
          style={{ marginLeft: "600px" }}
          icon={faArrowLeft}
          onClick={() => {
            setIndex(index - 1);
          }}
        />
        <FontAwesomeIcon
          className="ml-5 fa-2x"
          icon={faArrowRight}
          onClick={() => {
            setIndex(index + 1);
          }}
        />
      </div>
    </>
  );
}
