const initialState = {
  sessionRunning: false,
  gameInitialized: false,
  scoreboard: [],
  playerNames: [],
  gamesPlayed: 0,
  currentSeat: 1,
  moveTurn: 1,
  gameMode: "SINGLE_PLAYER",
  gameScore: {},
  chooseBigTurn: null,
  askingCard: null,
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

    case "SET_GAME_INITIALIZED":
      return {
        ...state,
        gameInitialized: action.payload,
      };

    case "SET_PLAYER_NAMES":
      return {
        ...state,
        playerNames: action.payload,
      };

    default:
      return state;
  }
};
