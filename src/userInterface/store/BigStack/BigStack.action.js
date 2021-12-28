export const ADD_CARD_TO_BIG_STACK = "ADD_CARD_TO_BIG_STACK";
export const RESET_BIG_STACK = "RESET_BIG_STACK";

export const addCardToBigStack = (card) => ({
  type: ADD_CARD_TO_BIG_STACK,
  card,
});

export const resetBigStack = () => ({
  type: RESET_BIG_STACK,
});
