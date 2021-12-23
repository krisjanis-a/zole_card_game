const getInitialState = () => ({});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_ROUND_RESULT":
      return {
        ...state,
        gameScore: action.payload,
      };

    default:
      return state;
  }
};
