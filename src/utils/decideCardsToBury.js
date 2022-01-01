// Computer decide cards to bury

const decideCardsToBury = (playerHand) => {
  const buryCards = playerHand
    .map((card) => card.id) // Card => id
    .sort((a, b) => a - b) // sort cards according to id
    .map((id) => {
      return playerHand.filter((item) => item.id === id)[0];
    }) // id => Card
    .slice(-2);

  return buryCards;
};

export default decideCardsToBury;
