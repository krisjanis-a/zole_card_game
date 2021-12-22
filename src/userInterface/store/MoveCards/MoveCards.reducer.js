export const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_MOVE_CARD": {
      if (state.length < 3) {
        let newState = [...state];
        newState.push(action.payload);
        return newState;
      }
      return state;
    }

    case "RESET_MOVE_CARDS":
      getInitialState();

    default:
      return state;
  }
};
