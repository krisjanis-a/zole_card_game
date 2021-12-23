const getInitialState = () => ({
  collectiveDue: 0,
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_COLLECTIVE_DUE":
      return {
        collectiveDue: state.collectiveDue + 1,
      };

    case "REMOVE_COLLECTIVE_DUE":
      return {
        collectiveDue: state.collectiveDue - 1,
      };

    case "RESET_COLLECTIVE_DUES":
      return getInitialState();

    default:
      return state;
  }
};
