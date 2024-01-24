function QuizStartScreen({ questionsAmount, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsAmount} questions to test your React mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "quizRunning" })}>
        Let's start
      </button>
    </div>
  );
}

export default QuizStartScreen;
