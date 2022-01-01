const getInitialState = () => ({
  choosingBigPhase: false,
  buryingCardsPhase: false,
  makingMovesPhase: false,
  resultsPhase: false,
  currentPhase: null,
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_ROUND_PHASE": {
      const { phase } = action;
      return {
        ...state,
        currentPhase: phase,
      };
    }

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

    case "RESET_ROUND_PHASE":
      return getInitialState();

    default:
      return state;
  }
};
