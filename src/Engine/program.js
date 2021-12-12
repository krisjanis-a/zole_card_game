import cards from "./Data/Cards.js";
import Player from "./Models/Player.js";
import createDeck from "./Utils/createDeck.js";
import dealCards from "./Utils/dealCards.js";
import cardIdToCard from "./Utils/cardIdToCard.js";
import * as readline from "readline";

// const readline = require("readline");

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

let smallOnesStack = [];
let bigOneStack = [];

// Initialize session
sessionRunning = true;

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

table = hands[hands.length - 1];

// Prompt user input on console
function askQuestion(query, i) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);

      if (ans === "T") {
        console.log(`${players[i].name} chose to pick up table`);
        players[i].setBig(true);
        choosingBig = false;
        return;
      }
      if (ans === "Z") {
        console.log(`${players[i].name} chose to play Zole`);
        players[i].setBig(true);
        players[i].setPlayZole(true);
        choosingBig = false;
        return;
      }
      if (ans === "P") {
        console.log(`${players[i].name} chose to pass`);
        i++;
        i !== players.length && console.log("Prompting next user\n");
        i === players.length && console.log("All players passed\n");
        if (i < players.length) {
          promptUser(players, i);
        }
        return;
      }
    })
  );
}

// Ask each player for decision: if wants to be big, play Zole or pass

let choosingBig = true;

function promptUser(players, i) {
  console.log(`${players[i].name} hand:`);
  console.log(players[i].hand.map((item) => item.name));
  console.log(`${players[i].name}, what is your decision?`);
  console.log("1) Take table (T) \n2) Pass (P)\n3) Zole (Z)");
  askQuestion("Press corresponding key:\n", i);
}

promptUser(players, 0);
