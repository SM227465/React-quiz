export default interface Action {
  type:
    | 'dataReceived'
    | 'dataFailed'
    | 'start'
    | 'newAnswer'
    | 'nextQuestion'
    | 'finish'
    | 'restart';
  payload?: any;
}
