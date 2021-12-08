import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./GameScreen.scss";

import PlayerHand from "../PlayerHand/PlayerHand";
import OpponentHand from "../OpponentHand/OpponentHand";
import TableHand from "../TableHand/TableHand";
import MoveCards from "../MoveCards/MoveCards";

import Player from "../../../engine/Models/Player";

import Cards from "../../../engine/Data/Cards";
import createDeck from "../../../engine/Utils/createDeck";
import dealCards from "../../../engine/Utils/dealCards";
import { useDispatch } from "react-redux";

const GameScreen = () => {
  const dispatch = useDispatch();

  const sessionRunning = useSelector((state) => state.Game.sessionRunning);
  const moveCards = useSelector((state) => state.MoveCards);

  const deck = createDeck(Cards);
  const hands = dealCards(deck, 3);

  const player1 = new Player();
  const player2 = new Player();
  const player3 = new Player();

  player1.setName("Player 1");
  player2.setName("Player 2");
  player3.setName("Player 3");

  dispatch({ type: "ADD_PLAYER", payload: player1 });
  dispatch({ type: "ADD_PLAYER", payload: player2 });
  dispatch({ type: "ADD_PLAYER", payload: player3 });
  dispatch({ type: "SET_TABLE", payload: hands[3] });

  const players = useSelector((state) => state.Players);
  const table = useSelector((state) => state.Table);

  const runGame = () => {
    while (sessionRunning) {
      // Initialize players
      // Set players names, seat numbers etc.
      // Deal cards
      // Ask in ascending seat order whether to take table / become the Big One of the game
      // On card click
      // Keep count of remaining moves
      // Determine result
      // Initialize new game / Deal cards
    }
  };

  // Set player hands in state
  let i = 0;

  Object.keys(players).forEach((player) => {
    dispatch({
      type: "SET_PLAYER_HAND",
      payload: { name: player, newHand: hands[i] },
    });
    i++;
  });

  return (
    <div className="gameScreen">
      <PlayerHand playerHand={players[player1.name].hand} seat={1} />
      <OpponentHand opponentHand={player2.hand} seat={2} />
      <OpponentHand opponentHand={player3.hand} seat={3} />
      <TableHand tableCards={table} />
      <MoveCards moveCards={moveCards} />
    </div>
  );
};

export default GameScreen;
