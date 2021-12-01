import cards from "./Data/Cards.js";
import Player from "./Models/Player.js";
import createDeck from "./Utils/createDeck.js";
import dealCards from "./Utils/dealCards.js";
import cardIdToCard from "./Utils/cardIdToCard.js";

console.log("Welcome to Zole!");

// Create players => should be a function
const player1 = new Player();
const player2 = new Player();
const player3 = new Player();

// Set player's names
player1.setName("Arnold");
player2.setName("Bob");
player3.setName("Cornelius");

const players = [player1, player2, player3];
const playersNames = [player1.name, player2.name, player3.name];
console.log("\nThis session's players:");
console.log(playersNames);

const newDeck = createDeck(cards);
// console.log("\nThis session's deck:");
// console.log(
//   `${newDeck.map((cardId) => "\n\t" + cardIdToCard(cardId, cards).name)}`
// );

// Deal cards to players
const hands = dealCards(newDeck, players.length);

for (let i = 0; i < players.length; i++) {
  players[i].setHand(hands[i]);
}

const table = hands.at(-1);

// players.forEach((player) => {
//   console.log(
//     `\n${player.name}'s hand ${player.hand.map(
//       (cardId) => "\n\t" + cardIdToCard(cardId, cards).name
//     )}`
//   );
// });

// console.log(
//   `\nTable ${table.map((cardId) => "\n\t" + cardIdToCard(cardId, cards).name)}`
// );
