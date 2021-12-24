const getInitialState = () => ({
  sessionRunning: false, // responsible for clearing any previous session data
  playerNames: [],
  roundsPlayed: 0,
  startingSeat: 1, // starting seat of current round; after each round moves +1 seat forward cyclically
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

    case "NEXT_STARTING_SEAT":
      let nextStartingSeat = state.startingSeat++;
      if (nextStartingSeat === 4) {
        nextStartingSeat = 1;
      }

      return {
        ...state,
        startingSeat: nextStartingSeat,
      };

    case "RESET_SESSION":
      return getInitialState();

    default:
      return state;
  }
};
