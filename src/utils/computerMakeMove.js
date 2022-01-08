import addCardToMoveCard from "./addCardToMoveCard";
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
  const delayComputerMakeMove = setTimeout(() => {
    //    - Get valid card choices
    //    - Evaluate which card to use in the move (if multiple options => choose randomly for now)
    const card = chooseMoveCard(
      activePlayer.hand,
      askingCard,
      moveCards,
      activePlayer
    );

    //    - Add card to move cards
    addCardToMoveCard(dispatch, moveCards, moveTurn, card, activePlayer);
  }, decisionTime);

  addTimeoutToStorage(delayComputerMakeMove);
};

export default computerMakeMove;
