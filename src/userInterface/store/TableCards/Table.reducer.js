const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "SET_TABLE": {
      const { table } = action;
      return table;
    }
    case "CLEAR_TABLE":
      return getInitialState();

    default:
      return state;
  }
};
