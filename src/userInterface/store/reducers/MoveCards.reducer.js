export default (state = [], action) => {
  switch (action.type) {
    case "ADD_MOVE_CARD":
      if (state.length < 3) {
        let newState = [...state];
        newState.push(action.payload);
        state = newState.map((card) => card);
      }
      return state;

    case "RESET_MOVE_CARDS":
      state = [];

    default:
      return state;
  }
};
