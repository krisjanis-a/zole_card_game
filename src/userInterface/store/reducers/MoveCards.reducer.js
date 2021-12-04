const initialState = {
  moveCards: [],
};

export default (state = initialState, action) => {
  const { moveCards } = state;
  console.log(moveCards);

  switch (action.type) {
    case "ADD_MOVE_CARD":
      state.moveCards.push(action.payload);

    case "RESET_MOVE_CARDS":
      state.moveCards = [];

    default:
      return state;
  }
};
