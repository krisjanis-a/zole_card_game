const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_TABLE_TO_SMALL_STACK": {
      const { table } = action;
      const newState = state.map((card) => card);
      newState.push(...table);
      return newState;
    }

    case "ADD_CARD_TO_SMALL_STACK": {
      const { card } = action;
      const newState = state.map((card) => card);
      newState.push(card);
      return newState;
    }

    case "RESET_SMALL_STACK": {
      return getInitialState();
    }

    default:
      return state;
  }
};
