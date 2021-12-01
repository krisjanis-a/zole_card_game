// Converts card's id to Card object
import cards from "../Data/Cards.js";

/**
 * @param id Playing card's id inside cards object
 * @param cards Cards object containing playing card objects
 */

function cardIdToCard(id, cards) {
  const cardsArray = [...Object.values(cards)];

  const card = cardsArray.filter((c) => c.id === id)[0];

  return card;
}

// *For Testing
// const QoS = cardIdToCard(2, cards);
// console.log(QoS);

export default cardIdToCard;
