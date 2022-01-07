import { addTableToPlayerHand, setBig } from "../store/Players/Players.action";
import { nextSeat, setChooseBigTurn } from "../store/Round/Round.actions";
import {
  setBuryingPhase,
  setChoosingBigPhase,
} from "../store/RoundPhase/RoundPhase.action";
import { clearTable } from "../store/TableCards/Table.action";
import decideBecomeBig from "./decideBecomeBig";
import { addTimeoutToStorage } from "./timeoutsOperations";

// Computer choose big
const computerChooseBig = (
  dispatch,
  decisionTime,
  activePlayer,
  chooseBigTurn,
  table
) => {
  const delayComputerDecideBecomeBig = setTimeout(() => {
    const becomeBig = decideBecomeBig(activePlayer.hand);

    if (becomeBig) {
      // Set big and add table to hand
      dispatch(setBig(activePlayer.name, true));
      dispatch(addTableToPlayerHand(activePlayer.name, table));
      dispatch(clearTable());
      dispatch(setChoosingBigPhase(false));
      dispatch(setBuryingPhase(true));
    }

    if (!becomeBig) {
      if (chooseBigTurn < 3) {
        dispatch(nextSeat());
        dispatch(setChooseBigTurn(chooseBigTurn + 1));
      }
      if (chooseBigTurn === 3) {
        dispatch(setChooseBigTurn(chooseBigTurn + 1));
      }
    }
  }, decisionTime);

  addTimeoutToStorage(delayComputerDecideBecomeBig);
};

export default computerChooseBig;
