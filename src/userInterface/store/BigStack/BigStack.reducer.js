const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_CARD_TO_BIG_STACK": {
      const newState = state.map((card) => card);
      newState.push(action.payload);
      return newState;
    }

    case "RESET_BIG_STACK": {
      return getInitialState();
    }

    default:
      return state;
  }
};
