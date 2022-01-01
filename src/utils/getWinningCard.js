function getWinningCard(moveCards) {
  // Variables
  const secondaryCards = moveCards.map((card) => card);
  const askingCard = secondaryCards.shift();
  let winningCard = askingCard;

  if (askingCard.card.isTrump) {
    secondaryCards.forEach((secondaryCard) => {
      const card = secondaryCard.card;
      if (card.isTrump) {
        if (card.strength > winningCard.card.strength) {
          winningCard = secondaryCard;
        }
      }
    });
  }

  if (!askingCard.card.isTrump) {
    const askingSuite = askingCard.card.suite;
    secondaryCards.forEach((secondaryCard) => {
      // If asking card is still the winning card && card is not trump
      const card = secondaryCard.card;
      if (
        card.suite === askingSuite &&
        !card.isTrump &&
        !winningCard.card.isTrump
      ) {
        if (card.strength > winningCard.card.strength) {
          winningCard = secondaryCard;
        }
      }
      // If asking card is still the winning card && card is trump
      if (card.isTrump && !winningCard.card.isTrump) {
        winningCard = secondaryCard;
      }
      // If winning card has become a trump && card is trump
      if (card.isTrump && winningCard.card.isTrump) {
        if (card.strength > winningCard.card.strength) {
          winningCard = secondaryCard;
        }
      }
    });
  }
  return winningCard;
}

export default getWinningCard;
