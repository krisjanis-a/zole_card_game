export const getInitialState = () => ({
  playZole: false,
  playSmallZole: false,
  playTable: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLAY_ZOLE":
      return {
        ...state,
        playZole: action.payload,
      };

    case "SET_PLAY_SMALL_ZOLE":
      return {
        ...state,
        smallZole: action.payload,
      };

    case "SET_PLAY_TABLE":
      return {
        ...state,
        playTable: action.payload,
      };

    default:
      return state;
  }
};
