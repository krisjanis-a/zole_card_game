const initialState = {
  sessionRunning: false,
  gameRunning: false,
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
  tableStack: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_SESSION":
      return {
        ...state,
        sessionRunning: true,
      };

    case "END_SESSION":
      return {
        ...state,
        sessionRunning: false,
      };

    case "SET_CHOOSE_BIG_TURN":
      return {
        ...state,
        chooseBigTurn: action.payload,
      };

    case "SET_GAME_RUNNING":
      return {
        ...state,
        gameRunning: action.payload,
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

    default:
      return state;
  }
};
