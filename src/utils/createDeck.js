/**
 * @param cards Cards object containing playing card objects
 */

function createDeck(cards) {
  // Here are all the card numbers(IDs) stored which are just ints
  let num = [];

  // Fill in with amount of cards IDs
  for (let i = 1; i <= Object.keys(cards).length; i++) {
    num.push(i);
  }

  // Randomize the IDs, map to an array each card from cards object
  let deckNum = [];

  while (num.length > 0) {
    // Get num length i.e. range of numbers
    const range = num.length;

    // Choose random number from num array length range
    const nextCardID = num[Math.floor(Math.random() * range)];

    // Add that number to deckNum array
    deckNum.push(nextCardID);

    // Delete the number from num array
    const index = num.indexOf(nextCardID);
    num.splice(index, 1);
  }

  // Return the newly created card deck (consists only of card IDs) for further use
  return deckNum;
}

export default createDeck;
