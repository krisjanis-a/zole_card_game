const getInitialState = () => ({});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_ROUND_RESULT":
      return {
        ...action.payload,
      };

    case "RESET_ROUND_RESULT":
      return getInitialState();

    default:
      return state;
  }
};
