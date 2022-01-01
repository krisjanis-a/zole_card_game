export const ADD_TABLE_TO_SMALL_STACK = "ADD_TABLE_TO_SMALL_STACK";
export const ADD_CARD_TO_SMALL_STACK = "ADD_CARD_TO_SMALL_STACK";
export const RESET_SMALL_STACK = "RESET_SMALL_STACK";

export const addTableToSmallStack = (table) => ({
  type: ADD_TABLE_TO_SMALL_STACK,
  table,
});

export const addCardToSmallStack = (card) => ({
  type: ADD_CARD_TO_SMALL_STACK,
  card,
});

export const resetSmallStack = () => ({
  type: RESET_SMALL_STACK,
});
