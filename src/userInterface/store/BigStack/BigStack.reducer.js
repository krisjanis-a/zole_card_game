export const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_CARD_TO_BIG_STACK": {
      const newState = { ...state };
      newState.bigStack.push(action.payload);
      return newState;
    }
    default:
      return state;
  }
};
