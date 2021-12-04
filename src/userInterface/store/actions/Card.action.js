export const makeMove = (cardId) => {
  return {
    type: "MAKE_MOVE",
    payload: cardId,
  };
};
