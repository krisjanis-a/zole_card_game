// This is player class which will hold all the information about players during a single game session

/**
 * @class Defines player object for session
 * @param {string} name Player's name
 * @param {Array} hand Cards dealt to the player
 */

export default class Player {
  constructor() {
    this.name = String;
    this.score = []; // for each session to be populated with scores of rounds
    this.hand = [];
    this.big = false;
    this.seatNumber = Number;
    this.stack = [];
  }

  setName(name) {
    this.name = name;
  }

  setScore(score) {
    const newScore = this.score;
    newScore.push(score);
    this.score = newScore;
  }

  setHand(hand) {
    this.hand = hand;
  }

  setBig(big) {
    this.big = big;
  }

  setSeat(seatNumber) {
    this.seatNumber = seatNumber;
  }

  setStack(card) {
    const newStack = this.stack;
    newStack.push(card);
    this.stack = newStack;
  }
}
