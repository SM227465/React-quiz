interface Props {
  index: number;
  points: number;
  answer: number | null;
  totalQuestions: number;
  maxPossiblePoints: number;
}
const ProgressBarComponent = (props: Props) => {
  const { index, totalQuestions, points, maxPossiblePoints, answer } = props;

  return (
    <header className='progress'>
      <progress max={totalQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{totalQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
};

export default ProgressBarComponent;
