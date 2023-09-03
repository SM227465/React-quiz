import Action from '../interfaces/action';
import Question from '../interfaces/question';
import OptionsComponent from './OptionsComponent';

interface Props {
  question: Question;
  answer: number | null;
  dispatch: (action: Action) => void;
}

const QuestionComponent = (props: Props) => {
  const { question, dispatch, answer } = props;

  return (
    <div>
      <h4>{question.question}</h4>
      <OptionsComponent question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};

export default QuestionComponent;
