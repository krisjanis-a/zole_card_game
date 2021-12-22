const getInitialState = () => ({
  initializeRound: false, // during session initialization or after each game / round
  roundRunning: false,
  roundFinished: false,
  moveCount: 0,
  startingSeat: 1, // starting seat of current round; after each round moves +1 seat forward cyclically
  currentSeat: 1, // current seat that is making active choices (choosing big, burying cards, choosing move card)
  chooseBigTurn: null, // player who is currently given choice of being big one
  bigOneWinsSmallZole: false,
});

export default (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case "INITIALIZE_ROUND":
      return {
        ...state,
        initializeRound: action.payload,
      };

    case "SET_ROUND_RUNNING":
      return {
        ...state,
        gameRunning: action.payload,
      };
    case "SET_ROUND_FINISHED":
      return {
        ...state,
        gameFinished: action.payload,
      };

    case "SET_CHOOSE_BIG_TURN":
      return {
        ...state,
        chooseBigTurn: action.payload,
      };

    case "SET_BIG_WINS_SMALL_ZOLE":
      return {
        ...state,
        bigOneWinsSmallZole: action.payload,
      };

    case "ADD_MOVE_COUNT":
      const newMoveCount = state.moveCount + 1;
      return {
        ...state,
        moveCount: newMoveCount,
      };

    case "RESET_MOVE_COUNT":
      return {
        ...state,
        moveCount: 0,
      };

    case "SET_CURRENT_SEAT_TO_STARTING_SEAT":
      return {
        ...state,
        currentSeat: state.startingSeat,
      };

    case "SET_CURRENT_SEAT":
      return {
        ...state,
        currentSeat: action.payload,
      };

    case "NEXT_SEAT": {
      let nextSeat = state.currentSeat + 1;
      if (nextSeat === 4) {
        nextSeat = 1;
      }

      return {
        ...state,
        currentSeat: nextSeat,
      };
    }

    case "NEXT_STARTING_SEAT":
      const nextStartingSeat = state.startingSeat++;

      return {
        ...state,
        startingSeat: nextStartingSeat,
      };

    default:
      return state;
  }
};
