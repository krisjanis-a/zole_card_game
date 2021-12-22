export const getInitialState = () => ({
  choosingBigPhase: false,
  buryingCardsPhase: false,
  makingMovesPhase: false,
  resultsPhase: false,
  currentPhase: null,
});

export default (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case typeName:
      return { ...state, ...payload };

    default:
      return state;
  }
};
