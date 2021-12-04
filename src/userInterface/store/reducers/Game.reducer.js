const initialState = {
  players: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      players.push(action.payload);

    default:
      return state;
  }
};
