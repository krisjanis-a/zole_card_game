// Deal equal amount of cards to any amount of players and leave remainder of cards to table (last hands array element)

/**
 * @param {Array} deck Array of card IDs in shuffled form
 * @param {Number} numberOfPlayers number of players (for standard Zole Game === 3)
 *  */

function dealCards(deck, numberOfPlayers) {
  // Create array for each player's hand + remaining cards (for Zole it is the table's cards)
  let hands = new Array();
  for (let i = 0; i < numberOfPlayers + 1; i++) {
    hands.push([]);
  }

  //   Deal the cards => fill each player's hand
  for (let i = 0; i < deck.length; ) {
    if ((deck.length - (i + 1)) / numberOfPlayers > 1) {
      for (let j = 0; j < numberOfPlayers; j++) {
        hands[j].push(deck[i]);
        i++;
      }
    } else {
      hands.at(-1).push(deck[i]);
      i++;
    }
  }

  return hands;
}

export default dealCards;
