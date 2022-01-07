import { nextMoveTurn, setAskingCard } from "../store/Move/Move.action";
import { addMoveCard } from "../store/MoveCards/MoveCards.action";
import { removeCardFromHand } from "../store/Players/Players.action";
import { nextSeat } from "../store/Round/Round.actions";
import chooseMoveCard from "./chooseMoveCard";
import { addTimeoutToStorage } from "./timeoutsOperations";

// Computer make move
const computerMakeMove = (
  dispatch,
  decisionTime,
  activePlayer,
  askingCard,
  moveCards,
  moveTurn
) => {
  // console.log(`Current phase ${currentPhase}`);
  // console.log(`${activePlayer.name} choosing move cards`);
  const delayComputerMakeMove = setTimeout(() => {
    //    - Get valid card choices
    //    - Evaluate which card to use in the move (if multiple options => choose randomly for now)
    const card = chooseMoveCard(
      activePlayer.hand,
      askingCard,
      moveCards,
      activePlayer
    );

    // console.log(`${activePlayer.name} chose move card ${card.name}`);

    //    - Add card to move cards
    if (moveCards.every((moveCard) => moveCard.id !== card.id)) {
      if (moveTurn === 1) {
        dispatch(setAskingCard(card));
      }
      dispatch(addMoveCard(card, activePlayer));
      dispatch(removeCardFromHand(activePlayer.name, card.id));

      if (moveTurn < 3) {
        dispatch(nextSeat());
        dispatch(nextMoveTurn());
      }
    }
  }, decisionTime);

  addTimeoutToStorage(delayComputerMakeMove);
};

export default computerMakeMove;
