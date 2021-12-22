const getInitialState = () => ({
  sessionRunning: false, // responsible for clearing any previous session data
  playerNames: [],
  roundsPlayed: 0,
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "INITIALIZE_SESSION":
      return {
        ...state,
        sessionRunning: true,
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
