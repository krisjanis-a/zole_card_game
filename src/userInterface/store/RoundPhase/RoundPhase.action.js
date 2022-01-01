export const SET_ROUND_PHASE = "SET_ROUND_PHASE";
export const SET_CHOOSING_BIG_PHASE = "SET_CHOOSING_BIG_PHASE";
export const SET_BURYING_PHASE = "SET_BURYING_PHASE";
export const SET_MAKING_MOVES_PHASE = "SET_MAKING_MOVES_PHASE";
export const SET_RESULTS_PHASE = "SET_RESULTS_PHASE";
export const RESET_ROUND_PHASE = "RESET_ROUND_PHASE";

export const setRoundPhase = (phase) => ({
  type: SET_ROUND_PHASE,
  phase,
});

export const setChoosingBigPhase = (status) => ({
  type: SET_CHOOSING_BIG_PHASE,
  status,
});

export const setBuryingPhase = (status) => ({
  type: SET_BURYING_PHASE,
  status,
});

export const setMakingMovesPhase = (status) => ({
  type: SET_MAKING_MOVES_PHASE,
  status,
});

export const setResultsPhase = (status) => ({
  type: SET_RESULTS_PHASE,
  status,
});

export const setChoosingBigPhase = () => ({
  type: RESET_ROUND_PHASE,
});
