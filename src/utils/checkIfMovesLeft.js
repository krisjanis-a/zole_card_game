import { setBigWinsSmallZole } from "../store/Round/Round.actions";
import {
  setMakingMovesPhase,
  setResultsPhase,
} from "../store/RoundPhase/RoundPhase.action";

// Check if players do not have any more cards in hand => if there are any moves left to be made
const checkIfMovesLeft = (dispatch, players, playSmallZole) => {
  if (
    Object.values(players).every((player) => {
      return player.hand.length === 0;
    })
  ) {
    dispatch(setMakingMovesPhase(false));
    dispatch(setResultsPhase(true));
    if (playSmallZole) {
      dispatch(setBigWinsSmallZole(true));
    }
  }
};

export default checkIfMovesLeft;
