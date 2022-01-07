import { addCollectiveDue } from "../store/DuesCollective/DuesCollective.action";
import {
  setAllPlayersPassed,
  setCurrentSeatToStartingSeat,
  setRoundFinished,
} from "../store/Round/Round.actions";
import {
  setChoosingBigPhase,
  setMakingMovesPhase,
} from "../store/RoundPhase/RoundPhase.action";
import { setPlayTable } from "../store/RoundType/RoundType.action";
import { updateScoreboard } from "../store/Scoreboard/Scoreboard.action";
import {
  addRoundPlayed,
  nextStartingSeat,
} from "../store/Session/Session.action";
import resetRound from "./resetRoundGS";
import { addTimeoutToStorage } from "./timeoutsOperations";

// Perform check & finalize choosing big phase
const finalizeChoosingBig = (
  dispatch,
  choosingBigPhase,
  chooseBigTurn,
  normalMode,
  players,
  startingSeat,
  tableMode
) => {
  if (choosingBigPhase) {
    if (chooseBigTurn > 3) {
      dispatch(setAllPlayersPassed(true));

      const delayFinalizeChoosingBig = setTimeout(() => {
        dispatch(setChoosingBigPhase(false));

        if (normalMode) {
          dispatch(setRoundFinished(true));
          dispatch(addCollectiveDue());
          dispatch(updateScoreboard("Collective Due"));
          dispatch(addRoundPlayed());
          dispatch(nextStartingSeat());
          resetRound(dispatch, players, startingSeat);
        }

        if (tableMode) {
          dispatch(setCurrentSeatToStartingSeat(startingSeat));
          dispatch(setMakingMovesPhase(true));
          dispatch(setPlayTable(true));
        }
      }, 1500);
      addTimeoutToStorage(delayFinalizeChoosingBig);
    }
  }
};

export default finalizeChoosingBig;
