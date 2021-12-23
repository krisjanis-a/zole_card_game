const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_TABLE_TO_SMALL_STACK": {
      const newState = state.map((card) => card);
      newState.push(...action.payload);
      return newState;
    }

    case "ADD_CARD_TO_SMALL_STACK": {
      const newState = state.map((card) => card);
      newState.push(action.payload);
      return newState;
    }

    case "RESET_SMALL_STACK": {
      return getInitialState();
    }

    default:
      return state;
  }
};
