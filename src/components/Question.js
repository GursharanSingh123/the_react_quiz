import Options from "./Options";

function Question({ question, selectedOption, dispatch, score }) {
  // console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        selectedOption={selectedOption}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Question;
