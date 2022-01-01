export const SET_PLAY_ZOLE = "SET_PLAY_ZOLE";
export const SET_PLAY_SMALL_ZOLE = "SET_PLAY_SMALL_ZOLE";
export const SET_PLAY_TABLE = "SET_PLAY_TABLE";
export const RESET_ROUND_TYPE = "RESET_ROUND_TYPE";

export const setPlayZole = (status) => ({
  type: SET_PLAY_ZOLE,
  status,
});

export const setPlaySmallZole = (status) => ({
  type: SET_PLAY_SMALL_ZOLE,
  status,
});

export const setPlayTable = (status) => ({
  type: SET_PLAY_TABLE,
  status,
});

export const resetRoundType = () => ({
  type: RESET_ROUND_TYPE,
});
