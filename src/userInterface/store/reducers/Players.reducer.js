export default (state = {}, action) => {
  let newState;

  switch (action.type) {
    case "ADD_PLAYER": {
      const { name } = action.payload;
      newState = { ...state, [name]: action.payload };
      return newState;
    }

    case "REMOVE_PLAYER": {
      return state;
    }

    case "SET_PLAYER_HAND": {
      const { name, newHand } = action.payload;
      state[name].setHand(newHand);
      return state;
    }

    case "REMOVE_CARD_FROM_HAND": {
      const { name, cardId } = action.payload;
      // state[name].
      return state;
    }

    case "SET_BIG": {
      const { name, big } = action.payload;
      state[name].setBig(big);
      return state;
    }

    case "ADD_TABLE_TO_PLAYER_HAND": {
      const { name, table } = action.payload;
      state[name].hand.push(...table);
      return state;
    }

    case "BURY_CARD": {
      return state;
    }

    case "SET_PLAY_ZOLE": {
      const { name, playZole } = action.payload;
      state[name].setPlayZole(playZole);
      return state;
    }

    default:
      return state;
  }
};
