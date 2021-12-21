export const getInitialState = () => ({
  normalMode: true, // play the game with dues ("pules") if all players pass
  tableMode: false, // play against table if all players pass
  smallZoleMode: false, // small Zole option
});

export default (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case typeName:
      return { ...state, ...payload };

    default:
      return state;
  }
};
