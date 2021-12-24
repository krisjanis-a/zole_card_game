export const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "UPDATE_SCOREBOARD": {
      const updatedScoreboard = state;
      updatedScoreboard.push(action.payload);
      return updatedScoreboard;
    }

    case "RESET_SCOREBOARD":
      return getInitialState();

    default:
      return state;
  }
};
