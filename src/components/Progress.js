function Progress({ currindex, score, questionsAmount, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={questionsAmount}
        value={currindex + Number(answer !== null)}
      />
      <p>
        Question <strong>{currindex + 1}</strong>/{questionsAmount}
      </p>
      <p>
        <strong>{score}</strong>/{maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
