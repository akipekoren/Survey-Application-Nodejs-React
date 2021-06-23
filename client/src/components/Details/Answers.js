export default function Answers(props) {
  const handleChange = (e) => {
    if (props.type === "text") {
      var qA = {
        id: Number(e.target.name),
        answers: e.target.value,
        mandatory: props.mandatory,
      };
      props.setAnswersToSurvey((oldAnswers) =>
        oldAnswers.map((a) => (a.id === qA.id ? { ...qA } : a))
      );
    } else {
      if (props.multiSelect) {
        console.log(e.target.value);
        console.log(e.target.name);
        var myObj = Object.values(props.answersToSurvey).filter(
          (el) => el.id === Number(e.target.name)
        );
        console.log(myObj[0]);
        if (myObj[0].answers.includes(e.target.value)) {
          myObj[0].answers = myObj[0].answers.replace(e.target.value + "?", "");
        } else {
          myObj[0].answers = e.target.value + "?" + myObj[0].answers;
        }

        props.setAnswersToSurvey((oldAnswers) =>
          oldAnswers.map((a) => (a.id === myObj[0].id ? { ...myObj[0] } : a))
        );
      } else {
        var qAc = {
          id: Number(e.target.name),
          answers: e.target.value,
          mandatory: props.mandatory,
        };

        props.setAnswersToSurvey((oldAnswers) =>
          oldAnswers.map((a) => (a.id === qAc.id ? { ...qAc } : a))
        );
      }
    }
  };

  return (
    <div>
      {props.type === "multi" ? (
        props.multiSelect ? (
          <ul style={{ listStyleType: "none" }}>
            {props.answers.map((answer) => (
              <>
                <li>
                  <label for="checkid" key={answer}>
                    <input
                      id="checkid"
                      type="checkbox"
                      value={answer}
                      name={props.id}
                      onChange={handleChange}
                      style={{
                        verticalAlign: "middle",
                        position: "relative",
                      }}
                    />
                    {answer}
                  </label>
                </li>
              </>
            ))}
          </ul>
        ) : (
          <select
            name={props.id}
            id="answers"
            onChange={handleChange}
            style={{ width: "50%" }}
          >
            {props.answers.map((answer) => (
              <option key={answer} value={answer} id={answer}>
                {answer}
              </option>
            ))}
          </select>
        )
      ) : (
        <textarea
          onChange={handleChange}
          name={props.id}
          rows="4"
          cols="45"
        ></textarea>
      )}
    </div>
  );
}
