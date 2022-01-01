export const SET_ACTIVE_PLAYER = "SET_ACTIVE_PLAYER";
export const RESET_ACTIVE_PLAYER = "RESET_ACTIVE_PLAYER";

export const setActivePlayer = (player) => ({
  type: SET_ACTIVE_PLAYER,
  player,
});

export const resetActivePlayer = () => ({
  type: RESET_ACTIVE_PLAYER,
});
