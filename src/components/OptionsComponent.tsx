import Action from '../interfaces/action';
import Question from '../interfaces/question';

interface Props {
  question: Question;
  answer: number | null;
  dispatch: (action: Action) => void;
}

const OptionsComponent = (props: Props) => {
  const { question, dispatch, answer } = props;
  const hasAnswered = answer !== null;

  return (
    <div className='options'>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} 
            ${hasAnswered && (index === question.correctOption ? 'correct' : 'wrong')}`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionsComponent;
