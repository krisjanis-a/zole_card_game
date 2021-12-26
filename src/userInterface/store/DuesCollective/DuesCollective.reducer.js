const getInitialState = () => ({
  dueCount: 0,
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_COLLECTIVE_DUE":
      return {
        dueCount: state.dueCount + 1,
      };

    case "REMOVE_COLLECTIVE_DUE":
      return {
        dueCount: state.dueCount - 1,
      };

    case "RESET_COLLECTIVE_DUES":
      return getInitialState();

    default:
      return state;
  }
};
