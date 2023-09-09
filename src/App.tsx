import { useEffect, useReducer } from 'react';
import ErrorComponent from './components/ErrorComponent';
import Header from './components/Header';
import Loader from './components/Loader';
import FinishScreenComponent from './components/FinishScreenComponent';
import Main from './components/Main';
import NextButtonComponent from './components/NextButtonComponent';
import ProgressBarComponent from './components/ProgressBarComponent';
import QuestionComponent from './components/QuestionComponent';
import StartScreen from './components/StartScreen';
import State from './interfaces/state';
import Action from './interfaces/action';
import questionsData from './data/questionsData';
import TimerComponent from './components/TimerComponent';
import Footer from './components/Footer';

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

const SECONDS_PER_QUESTION = 10;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, questions: action.payload, status: 'error' };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };

    case 'newAnswer':
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points,
      };

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Unknown action!');
  }
};

export default function App() {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);
  const { questions, status, index, answer, points, highscore, secondsRemaining } = state;
  const totalQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        // const res = await fetch('http://localhost:8000/questions');
        // const data = await res.json();
        dispatch({ type: 'dataReceived', payload: questionsData.questions });
        // console.log(questionsData);
        // console.log(data);
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    };

    getQuestions();
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorComponent />}
        {status === 'ready' && <StartScreen totalQuestions={totalQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <ProgressBarComponent
              index={index}
              answer={answer}
              points={points}
              totalQuestions={totalQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <QuestionComponent question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <TimerComponent dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButtonComponent
                dispatch={dispatch}
                answer={answer}
                totalQuestions={totalQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreenComponent
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
