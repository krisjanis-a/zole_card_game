export const getInitialState = () => ({});

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ROUND_RESULT_TO_SCOREBOARD":
      return state;

    case "UPDATE_SCOREBOARD": {
      const updatedScoreboard = state.scoreboard;
      updatedScoreboard.push(action.payload);
      return {
        ...state,
        scoreboard: updatedScoreboard,
      };
    }

    default:
      return state;
  }
};