import "modern-normalize/modern-normalize.css";
import { useEffect, useState } from "react";
import "./App.css";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const LOCAL_STORAGE_KEY = "state";

const App = () => {
  const [state, setState] = useState(() => {
    const savedState = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  const updateFeedback = (feedbackType) => {
    setState({
      ...state,
      [feedbackType]: state[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setState({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalFeedback = state.good + state.neutral + state.bad;
  const positiveFeedback = totalFeedback
    ? Math.round((state.good / totalFeedback) * 100)
    : 0;

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          state={state}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App;
