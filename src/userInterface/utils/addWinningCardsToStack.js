//  Add winning cards to correct stack

import { addCardToBigStack } from "../store/BigStack/BigStack.action";
import { addCardsToStack } from "../store/Players/Players.action";
import { addCardToSmallStack } from "../store/SmallStack/SmallStack.action";
import {
  addBigTrickCount,
  addSmallTrickCount,
} from "../store/Tricks/Tricks.action";

const addWinningCardsToStack = (
  dispatch,
  winningPlayer,
  moveCards,
  playTable,
  playSmallZole,
  tableMode
) => {
  const cards = moveCards.map((card) => card.card);
  if (!playTable && !playSmallZole) {
    if (winningPlayer.big) {
      cards.map((card) => dispatch(addCardToBigStack(card)));
      dispatch(addBigTrickCount());
    }
    if (!winningPlayer.big) {
      cards.map((card) => dispatch(addCardToSmallStack(card)));
      dispatch(addSmallTrickCount());
    }
  }

  // All players pass and playing table
  if (tableMode && playTable) {
    cards.map((card) => {
      dispatch(addCardsToStack(winningPlayer.name, card));
    });
  }
};

export default addWinningCardsToStack;
