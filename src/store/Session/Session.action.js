export const INITIALIZE_SESSION = "INITIALIZE_SESSION";
export const SET_PLAYER_NAMES = "SET_PLAYER_NAMES";
export const NEXT_STARTING_SEAT = "NEXT_STARTING_SEAT";
export const ADD_ROUND_PLAYED = "ADD_ROUND_PLAYED";
export const RESET_SESSION = "RESET_SESSION";

export const initializeSession = () => ({
  type: INITIALIZE_SESSION,
});

export const setPlayerNames = (names) => ({
  type: SET_PLAYER_NAMES,
  names,
});

export const nextStartingSeat = () => ({
  type: NEXT_STARTING_SEAT,
});

export const addRoundPlayed = () => ({
  type: ADD_ROUND_PLAYED,
});

export const resetSession = () => ({
  type: RESET_SESSION,
});
