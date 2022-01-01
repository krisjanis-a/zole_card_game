import { resetBigStack } from "../store/BigStack/BigStack.action";
import { resetMove } from "../store/Move/Move.action";
import { resetMoveCards } from "../store/MoveCards/MoveCards.action";
import { setBig } from "../store/Players/Players.action";
import {
  resetMoveCount,
  setAllPlayersPassed,
  setBigWinsSmallZole,
  setChooseBigTurn,
  setCurrentSeatToStartingSeat,
  setInitializeRound,
  setRoundFinished,
  setRoundRunning,
} from "../store/Round/Round.actions";
import { resetRoundPhase } from "../store/RoundPhase/RoundPhase.action";
import { resetRoundResult } from "../store/RoundResult/RoundResult.action";
import { resetRoundType } from "../store/RoundType/RoundType.action";
import { resetSmallStack } from "../store/SmallStack/SmallStack.action";
import { clearTable } from "../store/TableCards/Table.action";
import { resetTableStack } from "../store/TableStack/TableStack.action";
import { resetTrickCounts } from "../store/Tricks/Tricks.action";

// Reset round (GameScreen component version)

const resetRound = (dispatch, players, startingSeat) => {
  // Reset round running/finished, move count, current seat, choose big turn, big one wins small zole parameters
  dispatch(setRoundRunning(false));
  dispatch(setRoundFinished(false));
  dispatch(resetMoveCount());
  dispatch(setCurrentSeatToStartingSeat(startingSeat));
  dispatch(setChooseBigTurn(null));
  dispatch(setBigWinsSmallZole(false));
  dispatch(setAllPlayersPassed(false));

  // Reset round phase, result & type
  dispatch(resetRoundPhase());
  dispatch(resetRoundResult());
  dispatch(resetRoundType());
  dispatch(resetMove());
  dispatch(resetMoveCards());

  // Reset table, stacks & tricks
  dispatch(clearTable());
  dispatch(resetBigStack());
  dispatch(resetSmallStack());
  dispatch(resetTableStack());
  dispatch(resetTrickCounts());

  // Reset player's big one parameter
  Object.values(players).forEach((player) => {
    dispatch(setBig(player.name, false));
  });

  // Initialize new round
  dispatch(setInitializeRound(true));
};

export default resetRound;
