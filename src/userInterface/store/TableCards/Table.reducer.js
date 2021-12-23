const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_TABLE":
      return action.payload;

    case "CLEAR_TABLE":
      return getInitialState();

    default:
      return state;
  }
};
