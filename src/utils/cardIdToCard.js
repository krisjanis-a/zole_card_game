// Converts card's id to Card object
import cards from "../data/Cards.js";
import Card from "../models/Card.js";

/**
 * @param id Playing card's id inside cards object
 * @param cards Cards object containing playing card objects
 */

function cardIdToCard(id) {
  const cardsArray = [...Object.values(cards)];

  const cardObject = cardsArray.filter((c) => c.id === id)[0];

  const card = new Card();
  // console.log(cardObject);

  // Set values on Card instance from card object
  card.id = cardObject.id;
  card.name = cardObject.name;
  card.suite = cardObject.suite;
  card.nominal = cardObject.nominal;
  card.strength = cardObject.strength;
  card.isTrump = cardObject.isTrump;
  card.img = cardObject.img;
  card.value = cardObject.value;

  // console.log(card);

  return card;
}

// *For Testing
// const QoS = cardIdToCard(2, cards);
// console.log(QoS);

export default cardIdToCard;
