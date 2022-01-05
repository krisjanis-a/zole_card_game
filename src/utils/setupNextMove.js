import { setAskingCard } from "../store/Move/Move.action";
import { resetMoveCards } from "../store/MoveCards/MoveCards.action";
import { addMoveCount, setCurrentSeat } from "../store/Round/Round.actions";

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
  dispatch(setCurrentSeat(winningCard.owner.seatNumber));
  checkIfMovesLeft(dispatch, players, playSmallZole);
};

export default setupNextMove;
