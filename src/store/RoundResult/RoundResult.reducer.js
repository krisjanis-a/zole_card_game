const getInitialState = () => ({});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_ROUND_RESULT": {
      const { result } = action;
      return {
        ...result,
      };
    }

    case "RESET_ROUND_RESULT":
      return getInitialState();

    default:
      return state;
  }
};
