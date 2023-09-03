import Action from '../interfaces/action';

interface Props {
  totalQuestions: number;
  dispatch: (action: Action) => void;
}

const StartScreen = (props: Props) => {
  const { totalQuestions, dispatch } = props;

  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{totalQuestions} questions to test your mastery</h3>
      <button className='btn btn-ui' onClick={() => dispatch({ type: 'start' })}>
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
