const initialState = {
  moveCards: [],
};

export default (state = initialState, action) => {
  const { moveCards } = state;
  // console.log(moveCards);

  switch (action.type) {
    case "ADD_MOVE_CARD":
      if (moveCards.length < 3) {
        let newState = [...moveCards];
        newState.push(action.payload);
        state.moveCards = newState;
      }
      return state;

    case "RESET_MOVE_CARDS":
      state.moveCards = [];

    default:
      return state;
  }
};
