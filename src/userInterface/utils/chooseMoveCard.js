// Computer makes next move card choice

const chooseMoveCard = (playerHand, askingCard, moveCards, owner) => {
  const validCards = playerHand
    .filter((card) => {
      if (checkIfCardValid(card, askingCard, owner)) {
        return card;
      }
    })
    .map((card) => card.id) // Card => id
    .sort((a, b) => b - a) // sort cards according to id
    .map((id) => {
      return playerHand.filter((item) => item.id === id)[0];
    }); // id => Card;

  let card;

  for (let i = 0; i < validCards.length; i++) {
    if (!askingCard) {
      card = validCards[i];
      break;
    }
    if (validCards[i].strength >= askingCard.strength) {
      card = validCards[i];
      break;
    } else {
      card = validCards[0];
    }
  }

  return card;
};

export default chooseMoveCard;
