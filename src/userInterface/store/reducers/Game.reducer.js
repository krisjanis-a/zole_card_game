const initialState = {
  sessionRunning: false,
  gameRunning: false,
  choosingBigPhase: false,
  buryingCardsPhase: false,
  makingMovesPhase: false,
  resultsPhase: false,
  scoreboard: [],
  playerNames: [],
  gamesPlayed: 0,
  currentSeat: 1,
  moveTurn: 1,
  gameMode: "SINGLE_PLAYER",
  gameScore: {},
  chooseBigTurn: null,
  askingCard: null,
  smallStack: [],
  bigStack: [],
  tableStack: [], // in case all players pass and decide to play "Galdiņš" i.e. Play Table, players play against table and it is possible for table to win first two rounds instead of players. This is a special game mode
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_SESSION":
      return {
        ...state,
        sessionRunning: true,
      };

    case "END_SESSION":
      return initialState;

    case "SET_GAME_RUNNING":
      return {
        ...state,
        gameRunning: action.payload,
      };

    case "SET_CHOOSING_BIG_PHASE":
      return {
        ...state,
        choosingBigPhase: action.payload,
      };

    case "SET_CHOOSE_BIG_TURN":
      return {
        ...state,
        chooseBigTurn: action.payload,
      };

    case "SET_PLAYER_NAMES":
      return {
        ...state,
        playerNames: action.payload,
      };

    case "ADD_TABLE_TO_SMALL_STACK": {
      const { table } = action.payload;
      return {
        ...state,
        smallStack: table,
      };
    }

    case "SET_BURYING_PHASE":
      return {
        ...state,
        buryingCardsPhase: action.payload,
      };

    default:
      return state;
  }
};
