import { setMoveInProcess } from "../store/Move/Move.action";
import {
  setMakingMovesPhase,
  setResultsPhase,
} from "../store/RoundPhase/RoundPhase.action";
import getWinningCard from "./getWinningCard";
import setupNextMove from "./setupNextMove";
import { addTimeoutToStorage } from "./timeoutsOperations";

// Finalize move
const finalizeMove = (
  dispatch,
  moveTurn,
  moveCards,
  smallZoleMode,
  playSmallZole,
  players,
  playTable,
  tableMode
) => {
  if (moveTurn === 3 && moveCards.length === 3) {
    dispatch(setMoveInProcess(false));
    const winningCard = getWinningCard(moveCards);

    if (smallZoleMode && playSmallZole && winningCard.owner.big) {
      dispatch(setMakingMovesPhase(false));
      dispatch(setResultsPhase(true));
    }

    const delaySetupNextMove = setTimeout(() => {
      setupNextMove(
        dispatch,
        winningCard,
        players,
        playSmallZole,
        moveCards,
        playTable,
        tableMode
      );
    }, 1500);
    addTimeoutToStorage(delaySetupNextMove);
  }
};

export default finalizeMove;
