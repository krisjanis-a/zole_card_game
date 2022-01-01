export const ADD_CARD_TO_TABLE_STACK = "ADD_CARD_TO_TABLE_STACK";
export const RESET_TABLE_STACK = "RESET_TABLE_STACK";

export const addCardToTableStack = (card) => ({
  type: ADD_CARD_TO_TABLE_STACK,
  card,
});

export const resetTableStack = () => ({
  type: RESET_TABLE_STACK,
});
