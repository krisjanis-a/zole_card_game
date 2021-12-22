export const getInitialState = () => ({
  choosingBigPhase: false,
  buryingCardsPhase: false,
  makingMovesPhase: false,
  resultsPhase: false,
  currentPhase: null,
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_GAME_PHASE":
      return {
        ...state,
        currentPhase: action.payload,
      };

    case "SET_CHOOSING_BIG_PHASE":
      return {
        ...state,
        choosingBigPhase: action.payload,
      };

    case "SET_BURYING_PHASE":
      return {
        ...state,
        buryingCardsPhase: action.payload,
      };

    case "SET_MAKING_MOVES_PHASE":
      return {
        ...state,
        makingMovesPhase: action.payload,
      };

    case "SET_RESULTS_PHASE":
      return {
        ...state,
        resultsPhase: action.payload,
      };

    default:
      return state;
  }
};
