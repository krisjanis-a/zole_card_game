const getInitialState = () => ({});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "RESET_PERSONAL_DUES":
      return getInitialState();

    default:
      return state;
  }
};
