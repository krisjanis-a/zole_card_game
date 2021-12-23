const getInitialState = () => ({
  moveTurn: 1,
  askingCard: null, // first card placed in single move
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_ASKING_CARD":
      return {
        ...state,
        askingCard: action.payload,
      };

    case "NEXT_MOVE_TURN": {
      let nextMoveTurn = state.moveTurn + 1;
      if (nextMoveTurn === 4) {
        nextMoveTurn = 1;
      }
      return { ...state, moveTurn: nextMoveTurn };
    }

    case "RESET_MOVE": {
      return getInitialState();
    }

    default:
      return state;
  }
};
