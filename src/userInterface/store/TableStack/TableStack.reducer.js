const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_CARD_TO_TABLE_STACK": {
      const { card } = action;
      const newState = [...state];
      newState.tableStack.push(card);
      return newState;
    }

    case "RESET_TABLE_STACK":
      return getInitialState();

    default:
      return state;
  }
};
