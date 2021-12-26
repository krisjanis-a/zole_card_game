const getInitialState = () => ({});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_ACTIVE_PLAYER":
      return action.payload;

    default:
      return state;
  }
};
