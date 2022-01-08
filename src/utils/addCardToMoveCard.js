import { nextMoveTurn, setAskingCard } from "../store/Move/Move.action";
import { addMoveCard } from "../store/MoveCards/MoveCards.action";
import { removeCardFromHand } from "../store/Players/Players.action";
import { nextSeat } from "../store/Round/Round.actions";

// Add card to move card
const addCardToMoveCard = (dispatch, moveCards, moveTurn, card, owner) => {
  if (moveCards.every((moveCard) => moveCard.id !== card.id)) {
    if (moveTurn === 1) {
      dispatch(setAskingCard(card));
    }
    dispatch(addMoveCard(card, owner));
    dispatch(removeCardFromHand(owner.name, card.id));

    if (moveTurn < 3) {
      dispatch(nextSeat());
      dispatch(nextMoveTurn());
    }
  }
};

export default addCardToMoveCard;
