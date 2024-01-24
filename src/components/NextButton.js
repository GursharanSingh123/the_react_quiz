function NextButton({ dispatch, selectedOption, questionsAmount, currindex }) {
  const isLast = questionsAmount === currindex + 1;
  if (selectedOption === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        isLast
          ? dispatch({ type: "finished" })
          : dispatch({ type: "nextQuestion" });
      }}
    >
      {isLast ? "FINISH" : "NEXT"}
    </button>
  );
}

export default NextButton;
