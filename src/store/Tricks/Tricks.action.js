export const ADD_SMALL_TRICK_COUNT = "ADD_SMALL_TRICK_COUNT";
export const ADD_BIG_TRICK_COUNT = "ADD_BIG_TRICK_COUNT";
export const RESET_TRICK_COUNTS = "RESET_TRICK_COUNTS";

export const addSmallTrickCount = () => ({
  type: ADD_SMALL_TRICK_COUNT,
});

export const addBigTrickCount = () => ({
  type: ADD_BIG_TRICK_COUNT,
});

export const resetTrickCounts = () => ({
  type: RESET_TRICK_COUNTS,
});
