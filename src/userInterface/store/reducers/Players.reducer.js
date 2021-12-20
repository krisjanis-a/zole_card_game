export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_PLAYER": {
      const { name } = action.payload;
      const newState = { ...state, [name]: action.payload };
      return newState;
    }

    case "REMOVE_PLAYER": {
      return state;
    }

    case "RESET_PLAYERS": {
      return {};
    }

    case "SET_PLAYER_HAND": {
      const { name, newHand } = action.payload;
      const newState = { ...state };
      newState[name].setHand(newHand);
      return newState;
    }

    case "REMOVE_CARD_FROM_HAND": {
      const { name, cardId } = action.payload;
      const newHand = state[name].hand
        .map((card) => card)
        .filter((card) => card.id !== cardId);
      const newState = { ...state };
      newState[name].setHand(newHand);
      return newState;
    }

    case "SET_BIG": {
      const { name, big } = action.payload;
      const newState = { ...state };
      newState[name].setBig(big);
      return newState;
    }

    case "ADD_TABLE_TO_PLAYER_HAND": {
      const { name, table } = action.payload;
      const newState = { ...state };
      newState[name].hand.push(...table);
      return newState;
    }

    case "ADD_CARDS_TO_STACK": {
      const { name, card } = action.payload;
      const newState = { ...state };
      newState[name].setStack(card);
      return newState;
    }

    case "RESET_STACK": {
      const name = action.payload;
      const newState = { ...state };
      newState[name].stack = [];
      return newState;
    }

    default:
      return state;
  }
};
