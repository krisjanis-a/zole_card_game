const getInitialState = () => ({
  initializeRound: false, // during session initialization or after each game / round
  roundRunning: false, // while round running
  roundFinished: false, // for setting up next round
  moveCount: 0, // in case === 8 => round is finished
  currentSeat: null, // current seat that is making active choices (choosing big, burying cards, choosing move card)
  chooseBigTurn: null, // player who is currently given choice of being big one
  allPlayersPassed: false,
  bigOneWinsSmallZole: false, // in case small zole is played & big one wins
  computerPerformAction: false, // determines whether computer should be performing an action
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "INITIALIZE_ROUND":
      return {
        ...state,
        initializeRound: action.status,
      };

    case "SET_ROUND_RUNNING":
      return {
        ...state,
        roundRunning: action.status,
      };
    case "SET_ROUND_FINISHED":
      return {
        ...state,
        roundFinished: action.status,
      };

    case "SET_CHOOSE_BIG_TURN":
      return {
        ...state,
        chooseBigTurn: action.turn,
      };

    case "SET_BIG_WINS_SMALL_ZOLE":
      return {
        ...state,
        bigOneWinsSmallZole: action.status,
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

    case "SET_COMPUTER_PERFORM_ACTION":
      return {
        ...state,
        computerPerformAction: action.payload,
      };

    case "SET_ALL_PLAYERS_PASSED":
      return {
        ...state,
        allPlayersPassed: action.payload,
      };

    case "RESET_ROUND":
      return getInitialState();

    default:
      return state;
  }
};
