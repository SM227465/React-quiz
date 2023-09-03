import Question from './question';

export default interface State {
  questions: Question[];
  status: 'loading' | 'ready' | 'error' | 'active' | 'finished';
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
}
