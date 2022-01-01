export const SET_INITIALIZE_ROUND = "SET_INITIALIZE_ROUND";
export const SET_ROUND_RUNNING = "SET_ROUND_RUNNING";
export const SET_ROUND_FINISHED = "SET_ROUND_FINISHED";
export const SET_CHOOSE_BIG_TURN = "SET_CHOOSE_BIG_TURN";
export const SET_BIG_WINS_SMALL_ZOLE = "SET_BIG_WINS_SMALL_ZOLE";
export const ADD_MOVE_COUNT = "ADD_MOVE_COUNT";
export const RESET_MOVE_COUNT = "RESET_MOVE_COUNT";
export const SET_CURRENT_SEAT_TO_STARTING_SEAT =
  "SET_CURRENT_SEAT_TO_STARTING_SEAT";
export const SET_CURRENT_SEAT = "SET_CURRENT_SEAT";
export const NEXT_SEAT = "NEXT_SEAT";
export const SET_COMPUTER_PERFORM_ACTION = "SET_COMPUTER_PERFORM_ACTION";
export const SET_ALL_PLAYERS_PASSED = "SET_ALL_PLAYERS_PASSED";
export const RESET_ROUND = "RESET_ROUND";

export const setInitializeRound = (status) => ({
  type: SET_INITIALIZE_ROUND,
  status,
});

export const setRoundRunning = (status) => ({
  type: SET_ROUND_RUNNING,
  status,
});

export const setRoundFinished = (status) => ({
  type: SET_ROUND_FINISHED,
  status,
});

export const setChooseBigTurn = (turn) => ({
  type: SET_CHOOSE_BIG_TURN,
  turn,
});

export const setBigWinsSmallZole = (status) => ({
  type: SET_BIG_WINS_SMALL_ZOLE,
  status,
});

export const addMoveCount = () => ({
  type: ADD_MOVE_COUNT,
});

export const resetMoveCount = () => ({
  type: RESET_MOVE_COUNT,
});

export const setCurrentSeatToStartingSeat = (startingSeat) => ({
  type: SET_CURRENT_SEAT_TO_STARTING_SEAT,
  startingSeat,
});
