export const SET_ROUND_RESULT = "SET_ROUND_RESULT";
export const RESET_ROUND_RESULT = "RESET_ROUND_RESULT";

export const setRoundResult = (result) => ({
  type: SET_ROUND_RESULT,
  result,
});

export const resetRoundResult = () => ({
  type: RESET_ROUND_RESULT,
});
