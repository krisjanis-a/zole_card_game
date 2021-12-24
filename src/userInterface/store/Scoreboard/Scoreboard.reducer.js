export const getInitialState = () => [];

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_ROUND_RESULT_TO_SCOREBOARD":
      return state;

    case "UPDATE_SCOREBOARD": {
      const updatedScoreboard = state;
      console.log(updatedScoreboard);
      console.log(action.payload);
      updatedScoreboard.push(action.payload);
      return updatedScoreboard;
    }

    case "RESET_SCOREBOARD":
      return getInitialState();

    default:
      return state;
  }
};
