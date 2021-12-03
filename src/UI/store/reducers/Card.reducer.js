const cardReducer = (state = [], action) => {
  switch (action.type) {
    case "MAKE_MOVE": {
      return;
    }
    default:
      return state;
  }
};

export default cardReducer;
