import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import QuizStartScreen from "./QuizStartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import QuizEndScreen from "./QuizEndScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_SECOND = 30;

const initialValue = {
  questions: [],
  status: "loading",
  currindex: 0,
  selectedOption: null,
  score: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "quizRunning":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_SECOND,
      };
    case "answered":
      const question = state.questions.at(state.currindex);
      return {
        ...state,
        selectedOption: action.payload,
        score:
          question.correctOption === action.payload
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, currindex: state.currindex + 1, selectedOption: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore < state.score ? state.score : state.highscore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        currindex: 0,
        selectedOption: null,
        score: 0,
        secondsRemaining: 10,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      return initialValue;
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      currindex,
      selectedOption,
      score,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialValue);
  const questionsAmount = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  // console.log(maxPoints);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <QuizStartScreen
            questionsAmount={questionsAmount}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              currindex={currindex}
              score={score}
              questionsAmount={questionsAmount}
              maxPoints={maxPoints}
              answer={selectedOption}
            />
            <Question
              question={questions[currindex]}
              selectedOption={selectedOption}
              dispatch={dispatch}
              score={score}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                selectedOption={selectedOption}
                questionsAmount={questionsAmount}
                currindex={currindex}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <QuizEndScreen
            maxPoints={maxPoints}
            score={score}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
