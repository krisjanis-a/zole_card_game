export const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "UPDATE_SCOREBOARD": {
      const { roundScore } = action;
      const updatedScoreboard = state;
      updatedScoreboard.push(roundScore);
      return updatedScoreboard;
    }

    case "RESET_SCOREBOARD":
      return getInitialState();

    default:
      return state;
  }
};
