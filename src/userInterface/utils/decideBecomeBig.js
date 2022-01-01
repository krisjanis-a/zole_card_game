const decideBecomeBig = (playerHand) => {
  // Parameters that influence the decission
  let trumpCount = 0;
  let trumpStrength = 0;
  let aceCount = 0;

  let pickTable = false;

  // Object of these parameters (maybe not to be used)
  const handParameters = new Object();

  // Scan the hand for parameters
  playerHand.forEach((card) => {
    if (card.isTrump) {
      trumpCount++;
      trumpStrength = trumpStrength + card.strength;
    }

    if (card.nominal === "ace") {
      aceCount++;
    }
  });

  // Populate object
  handParameters.trumpCount = trumpCount;
  handParameters.trumpStrength = trumpStrength;
  handParameters.aceCount = aceCount;

  /* Conditions for taking hand:
      - if there are 5 or more trumps on hand
      - if the trump overall strength is bigger than [...]
      - if there are aces
    */

  if (trumpCount > 4) {
    if (trumpStrength > 61) {
      pickTable = true;
    }
  }

  // console.log(handParameters);
  // console.log(playerHand);

  return pickTable;
};

export default decideBecomeBig;
