const getInitialState = () => ({});

export default (state = initialState, action) => {
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
