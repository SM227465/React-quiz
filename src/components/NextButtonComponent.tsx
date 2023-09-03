import Action from '../interfaces/action';

interface Props {
  index: number;
  answer: number | null;
  totalQuestions: number;
  dispatch: (action: Action) => void;
}

const NextButtonComponent = (props: Props) => {
  const { dispatch, answer, index, totalQuestions } = props;

  if (answer === null) {
    return null;
  }

  if (index < totalQuestions - 1) {
    return (
      <div className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>
        Next
      </div>
    );
  }

  if (index === totalQuestions - 1) {
    return (
      <div className='btn btn-ui' onClick={() => dispatch({ type: 'finish' })}>
        Finish
      </div>
    );
  }
};

export default NextButtonComponent;
