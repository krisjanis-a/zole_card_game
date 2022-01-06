import {
  nextMoveTurn,
  setAskingCard,
  setMoveInProcess,
} from "../store/Move/Move.action";
import { resetMoveCards } from "../store/MoveCards/MoveCards.action";
import { addMoveCount, setCurrentSeat } from "../store/Round/Round.actions";
import addWinningCardsToStack from "./addWinningCardsToStack";
import checkIfMovesLeft from "./checkIfMovesLeft";

// Setup next move
const setupNextMove = (
  dispatch,
  winningCard,
  players,
  playSmallZole,
  moveCards,
  playTable,
  tableMode
) => {
  addWinningCardsToStack(
    dispatch,
    winningCard.owner,
    moveCards,
    playTable,
    playSmallZole,
    tableMode
  );
  dispatch(resetMoveCards());
  dispatch(addMoveCount());
  dispatch(setAskingCard(null));
  checkIfMovesLeft(dispatch, players, playSmallZole);
  dispatch(nextMoveTurn());
  dispatch(setCurrentSeat(winningCard.owner.seatNumber));
  dispatch(setMoveInProcess(true));
  console.log("Next move setup");
};

export default setupNextMove;
