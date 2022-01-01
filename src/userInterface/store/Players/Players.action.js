export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const RESET_PLAYERS = "RESET_PLAYERS";
export const SET_PLAYER_HAND = "SET_PLAYER_HAND";
export const REMOVE_CARD_FROM_HAND = "REMOVE_CARD_FROM_HAND";
export const SET_BIG = "SET_BIG";
export const ADD_TABLE_TO_PLAYER_HAND = "ADD_TABLE_TO_PLAYER_HAND";
export const ADD_CARDS_TO_STACK = "ADD_CARDS_TO_STACK";
export const RESET_STACK = "RESET_STACK";

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  player,
});

export const removePlayer = () => ({
  type: REMOVE_PLAYER,
});

export const resetPlayers = () => ({
  type: RESET_PLAYERS,
});

export const setPlayerHand = (name, newHand) => ({
  type: SET_PLAYER_HAND,
  name,
  newHand,
});

export const removeCardFromHand = (name, cardId) => ({
  type: REMOVE_CARD_FROM_HAND,
  name,
  cardId,
});

export const setBig = (name, big) => ({
  type: SET_BIG,
  name,
  big,
});

export const addTableToPlayerHand = (name, table) => ({
  type: ADD_TABLE_TO_PLAYER_HAND,
  name,
  table,
});

export const addCardsToStack = (name, card) => ({
  type: ADD_CARDS_TO_STACK,
  name,
  card,
});

export const resetStack = (name) => ({
  type: RESET_STACK,
  name,
});
