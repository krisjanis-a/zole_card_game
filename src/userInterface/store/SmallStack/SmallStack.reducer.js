const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_TABLE_TO_SMALL_STACK": {
      return {
        ...state,
        smallStack: action.payload,
      };
    }

    case "ADD_CARD_TO_SMALL_STACK": {
      const newState = { ...state };
      newState.smallStack.push(action.payload);
      return newState;
    }
    default:
      return state;
  }
};
