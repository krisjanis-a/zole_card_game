const initialState = {
  moveCards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MOVE_CARD":
      moveCards.push(action.payload);

    default:
      return state;
  }
};
