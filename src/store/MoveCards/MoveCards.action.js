export const ADD_MOVE_CARD = "ADD_MOVE_CARD";
export const RESET_MOVE_CARDS = "RESET_MOVE_CARDS";

export const addMoveCard = (card, owner) => ({
  type: ADD_MOVE_CARD,
  card,
  owner,
});

export const resetMoveCards = () => ({
  type: RESET_MOVE_CARDS,
});
