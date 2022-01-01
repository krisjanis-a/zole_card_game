const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_MOVE_CARD": {
      if (state.length < 3) {
        const { card, owner } = action;
        let newState = [...state];
        newState.push({ card, owner });
        return newState;
      }
      return state;
    }

    case "RESET_MOVE_CARDS":
      return getInitialState();

    default:
      return state;
  }
};
