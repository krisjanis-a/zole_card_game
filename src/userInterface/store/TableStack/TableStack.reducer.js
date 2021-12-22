const getInitialState = () => ({});

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CARD_TO_TABLE_STACK": {
      const newState = { ...state };
      newState.tableStack.push(action.payload);
      return newState;
    }

    default:
      return state;
  }
};
