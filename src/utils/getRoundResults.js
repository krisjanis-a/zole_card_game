//! ROUND RESULT CALCULATION

// Get result for each party
const getRoundResult = (bigOneStack, smallOnesStack) => {
  const results = {
    bigOneScore: null,
    smallOnesScore: null,
  };

  results.bigOneScore = bigOneStack.reduce(
    (score, card) => score + card.value,
    0
  );

  results.smallOnesScore = smallOnesStack.reduce(
    (score, card) => score + card.value,
    0
  );

  return results;
};

export default getRoundResult;
