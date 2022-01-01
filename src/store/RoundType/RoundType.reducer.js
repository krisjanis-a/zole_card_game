const getInitialState = () => ({
  playZole: false,
  playSmallZole: false,
  playTable: false,
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_PLAY_ZOLE":
      return {
        ...state,
        playZole: action.status,
      };

    case "SET_PLAY_SMALL_ZOLE":
      return {
        ...state,
        playSmallZole: action.status,
      };

    case "SET_PLAY_TABLE":
      return {
        ...state,
        playTable: action.status,
      };

    case "RESET_ROUND_TYPE":
      return getInitialState();

    default:
      return state;
  }
};
