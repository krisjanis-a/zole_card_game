const getInitialState = () => ({
  smallTrickCount: 0,
  bigTrickCount: 0,
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_SMALL_TRICK_COUNT":
      return {
        ...state,
        smallTrickCount: state.smallTrickCount + 1,
      };

    case "ADD_BIG_TRICK_COUNT":
      return {
        ...state,
        bigTrickCount: state.bigTrickCount + 1,
      };

    case "RESET_TRICK_COUNTS":
      return getInitialState();

    default:
      return state;
  }
};
