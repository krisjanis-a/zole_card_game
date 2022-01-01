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
      console.log("lewat");
      const { phase } = action;
      return {
        ...state,
        currentPhase: phase,
      };
    }

    case "SET_CHOOSING_BIG_PHASE":
      return {
        ...state,
        choosingBigPhase: action.status,
      };

    case "SET_BURYING_PHASE":
      return {
        ...state,
        buryingCardsPhase: action.status,
      };

    case "SET_MAKING_MOVES_PHASE":
      return {
        ...state,
        makingMovesPhase: action.status,
      };

    case "SET_RESULTS_PHASE":
      return {
        ...state,
        resultsPhase: action.status,
      };

    case "RESET_ROUND_PHASE":
      return getInitialState();

    default:
      return state;
  }
};
