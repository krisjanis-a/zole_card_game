const initialState = {
  sessionRunning: false,
  scoreboard: [],
  playerNames: [],
  gamesPlayed: 0,
  currentSeat: 1,
  turn: 1,
  gameMode: "SINGLE_PLAYER",
  gameScore: {},
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

    default:
      return state;
  }
};
