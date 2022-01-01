// Check if the specific card is valid according to asking card

const checkIfCardValid = (card, askingCard, owner) => {
  let cardValid = false;

  if (!askingCard) return (cardValid = true);

  if (askingCard.isTrump && card.isTrump) {
    cardValid = true;
  }

  if (!askingCard.isTrump && !card.isTrump && card.suite === askingCard.suite) {
    cardValid = true;
  }

  if (
    askingCard.isTrump &&
    owner.hand.filter((card) => card.isTrump).length === 0
  ) {
    cardValid = true;
  }

  if (
    !askingCard.isTrump &&
    owner.hand.filter(
      (card) => !card.isTrump && card.suite === askingCard.suite
    ).length === 0
  ) {
    cardValid = true;
  }

  return cardValid;
};

export default checkIfCardValid;
