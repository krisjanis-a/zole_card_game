export const SET_TABLE = "SET_TABLE";
export const CLEAR_TABLE = "CLEAR_TABLE";

export const setTable = (table) => ({
  type: SET_TABLE,
  table,
});

export const clearTable = () => ({
  type: CLEAR_TABLE,
});
