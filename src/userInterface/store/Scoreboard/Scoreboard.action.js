export const UPDATE_SCOREBOARD = "UPDATE_SCOREBOARD";
export const RESET_SCOREBOARD = "RESET_SCOREBOARD";

export const updateScoreboard = (roundScore) => ({
  type: UPDATE_SCOREBOARD,
  roundScore,
});

export const resetScoreboard = () => ({
  type: RESET_SCOREBOARD,
});
