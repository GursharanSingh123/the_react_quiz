function Options({ question, dispatch, selectedOption }) {
  const hasAnswered = selectedOption !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${selectedOption === i ? "answer" : ""} ${
            hasAnswered && (i === question.correctOption ? "correct" : "wrong")
          }`}
          key={i}
          onClick={() => dispatch({ type: "answered", payload: i })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
