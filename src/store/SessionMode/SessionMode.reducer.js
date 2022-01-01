const getInitialState = () => ({
  normalMode: true, // play the game with dues ("pules") if all players pass
  tableMode: false, // play against table if all players pass
  smallZoleMode: false, // small Zole option
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_NORMAL_MODE":
      return {
        ...state,
        normalMode: action.status,
      };
    case "SET_TABLE_MODE":
      return {
        ...state,
        tableMode: action.status,
      };
    case "SET_SMALL_ZOLE_MODE":
      return {
        ...state,
        smallZoleMode: action.status,
      };

    case "RESET_SESSION_MODE":
      return getInitialState();

    default:
      return state;
  }
};
