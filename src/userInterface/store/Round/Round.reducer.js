const getInitialState = () => ({
  initializeRound: false, // during session initialization or after each game / round
  roundRunning: false, // while round running
  roundFinished: false, // for setting up next round
  moveCount: 0, // in case === 8 => round is finished
  currentSeat: 1, // current seat that is making active choices (choosing big, burying cards, choosing move card)
  chooseBigTurn: null, // player who is currently given choice of being big one
  bigOneWinsSmallZole: false, // in case small zole is played & big one wins
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "INITIALIZE_ROUND":
      return {
        ...state,
        initializeRound: action.payload,
      };

    case "SET_ROUND_RUNNING":
      return {
        ...state,
        roundRunning: action.payload,
      };
    case "SET_ROUND_FINISHED":
      return {
        ...state,
        roundFinished: action.payload,
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
        currentSeat: action.payload,
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

    case "RESET_ROUND":
      return getInitialState();

    default:
      return state;
  }
};
