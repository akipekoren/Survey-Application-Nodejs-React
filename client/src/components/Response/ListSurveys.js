import { useEffect, useState } from "react";
import API from "../../API";
import { Link } from "react-router-dom";
export default function ListSurveys() {
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    API.getYourSurveys().then((newS) => {
      setSurveys(newS);
    });
  }, [surveys.length]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        border: "1px",
        backgroundColor: "#F2F3DE",
      }}
    >
      <div style={{ marginTop: "50px" }}>
        {surveys.map((survey) => (
          <div
            key={survey.id}
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
            {" "}
            <h4 style={{ fontFamily: "fantasy", marginTop: "12px" }}>
              {survey.title}{" "}
            </h4>{" "}
            <i> ( {survey.count} responses)</i>
            <small>
              <Link className="ml-3" to={"/responses/" + survey.id}>
                See the responses
              </Link>
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
