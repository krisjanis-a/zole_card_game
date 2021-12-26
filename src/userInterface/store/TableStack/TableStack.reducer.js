const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_CARD_TO_TABLE_STACK": {
      const newState = [...state];
      newState.tableStack.push(action.payload);
      return newState;
    }

    case "RESET_TABLE_STACK":
      return getInitialState();

    default:
      return state;
  }
};
