export const SET_NORMAL_MODE = "SET_NORMAL_MODE";
export const SET_TABLE_MODE = "SET_TABLE_MODE";
export const SET_SMALL_ZOLE_MODE = "SET_SMALL_ZOLE_MODE";
export const RESET_SESSION_MODE = "RESET_SESSION_MODE";

export const setNormalMode = (status) => ({
  type: SET_NORMAL_MODE,
  status,
});

export const setTableMode = (status) => ({
  type: SET_TABLE_MODE,
  status,
});

export const setSmallZoleMode = (status) => ({
  type: SET_SMALL_ZOLE_MODE,
  status,
});

export const resetSessionMode = () => ({
  type: RESET_SESSION_MODE,
});
