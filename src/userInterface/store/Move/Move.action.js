export const SET_ASKING_CARD = "SET_ASKING_CARD";
export const NEXT_MOVE_TURN = "NEXT_MOVE_TURN";
export const RESET_MOVE = "RESET_MOVE";

export const setAskingCard = (card) => ({
  type: SET_ASKING_CARD,
  card,
});

export const nextMoveTurn = () => ({
  type: NEXT_MOVE_TURN,
});

export const resetMove = () => ({
  type: RESET_MOVE,
});
