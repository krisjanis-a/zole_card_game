import { addCardToBigStack } from "../store/BigStack/BigStack.action";
import { removeCardFromHand } from "../store/Players/Players.action";
import decideCardsToBury from "./decideCardsToBury";
import { addTimeoutToStorage } from "./timeoutsOperations";

// Computer bury cards
const computerBuryCards = (dispatch, decisionTime, activePlayer) => {
  const delayComputerDecideBuryCards = setTimeout(() => {
    if (activePlayer.big) {
      const buryCards = decideCardsToBury(activePlayer.hand);

      buryCards.forEach((card) => {
        dispatch(addCardToBigStack(card));
        dispatch(removeCardFromHand(activePlayer.name, card.id));
      });
    }
  }, decisionTime);

  addTimeoutToStorage(delayComputerDecideBuryCards);
};

export default computerBuryCards;
