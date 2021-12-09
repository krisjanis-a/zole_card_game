import cards from "./Data/Cards.js";
import Player from "./Models/Player.js";
import createDeck from "./Utils/createDeck.js";
import dealCards from "./Utils/dealCards.js";
import cardIdToCard from "./Utils/cardIdToCard.js";

console.log("Welcome to Zole!");

// Game State
let sessionRunning = false;
let scoreboard = [];
let playerNames = [];
let gamesPlayed = 0;
let currentSeat = 1;
let turn = 1;
let gameScore = {};
let chooseBigTurn = null;
let askingCard = null;

let moveCards = [];
let table = [];
let players = [];

// Create players
const player1 = new Player();
const player2 = new Player();
const player3 = new Player();

// Set player's names
player1.setName("Arnold");
player2.setName("Bob");
player3.setName("Cornelius");

players = [player1, player2, player3];
const playersNames = [player1.name, player2.name, player3.name];
console.log("\nThis session's players:");
console.log(playersNames);

const newDeck = createDeck(cards);

// Deal cards to players
const hands = dealCards(newDeck, players.length);

for (let i = 0; i < players.length; i++) {
  const hand = hands[i].map((id) => cardIdToCard(id));
  players[i].setHand(hand);
}

table = hands.at(-1);
