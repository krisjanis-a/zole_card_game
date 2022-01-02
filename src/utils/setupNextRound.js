import { resetBigStack } from "../store/BigStack/BigStack.action";
import { resetMove } from "../store/Move/Move.action";
import { resetMoveCards } from "../store/MoveCards/MoveCards.action";
import { resetStack, setBig } from "../store/Players/Players.action";
import {
  resetMoveCount,
  setAllPlayersPassed,
  setBigWinsSmallZole,
  setChooseBigTurn,
  setCurrentSeatToStartingSeat,
  setShouldInitializeRound,
  setRoundFinished,
} from "../store/Round/Round.actions";
import { resetRoundPhase } from "../store/RoundPhase/RoundPhase.action";
import { resetRoundResult } from "../store/RoundResult/RoundResult.action";
import { resetRoundType } from "../store/RoundType/RoundType.action";
import {
  addRoundPlayed,
  nextStartingSeat,
} from "../store/Session/Session.action";
import { resetSmallStack } from "../store/SmallStack/SmallStack.action";
import { clearTable } from "../store/TableCards/Table.action";
import { resetTableStack } from "../store/TableStack/TableStack.action";
import { resetTrickCounts } from "../store/Tricks/Tricks.action";

// Setup everything for next round
const setupNextRound = (dispatch, players, startingSeat) => {
  // Reset round running/finished, move count, current seat, choose big turn, big one wins small zole parameters
  dispatch(setRoundFinished(false));
  dispatch(addRoundPlayed());
  dispatch(resetMoveCount());
  dispatch(setAllPlayersPassed(false));
  dispatch(nextStartingSeat());
  dispatch(setCurrentSeatToStartingSeat(startingSeat));
  dispatch(setChooseBigTurn(null));
  dispatch(setBigWinsSmallZole(false));

  // Reset round phase, score & type
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

  // Reset player's stack and big one parameter
  Object.values(players).forEach((player) => {
    dispatch(setBig(player.name, false));
    dispatch(resetStack(player.name));
  });

  // Initialize new round
  dispatch(setShouldInitializeRound(true));
};

export default setupNextRound;
