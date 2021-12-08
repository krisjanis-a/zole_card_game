export default (state = {}, action) => {
  let newState;

  switch (action.type) {
    case "ADD_PLAYER":
      newState = { ...state, [action.payload.name]: action.payload };
      return newState;

    case "REMOVE_PLAYER":
      return state;

    case "SET_PLAYER_HAND":
      const { name, newHand } = action.payload;
      state[name].setHand(newHand);

    default:
      return state;
  }
};
