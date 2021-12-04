const initialState = {
  moveCards: [],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAKE_MOVE": {
      return;
    }
    default:
      return state;
  }
};

export default cardReducer;
