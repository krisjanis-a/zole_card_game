const getInitialState = () => ({});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_ACTIVE_PLAYER":
      const { player } = action;
      return player;

    default:
      return state;
  }
};
