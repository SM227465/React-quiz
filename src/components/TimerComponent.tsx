import { useEffect } from 'react';
import Action from '../interfaces/action';

interface Props {
  secondsRemaining: number;
  dispatch: (action: Action) => void;
}

const TimerComponent = (props: Props) => {
  const { dispatch, secondsRemaining } = props;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const intervalInstance = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(intervalInstance);
  }, [dispatch]);

  return (
    <div className='timer'>
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
};

export default TimerComponent;
