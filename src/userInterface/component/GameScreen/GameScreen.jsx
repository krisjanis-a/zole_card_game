import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GameScreen.scss";

import PlayerHand from "../PlayerHand/PlayerHand";
import OpponentHand from "../OpponentHand/OpponentHand";
import TableHand from "../TableHand/TableHand";
import MoveCards from "../MoveCards/MoveCards";

import Player from "../../../engine/Models/Player";

import Cards from "../../../engine/Data/Cards";
import createDeck from "../../../engine/Utils/createDeck";
import dealCards from "../../../engine/Utils/dealCards";

const GameScreen = () => {
  const dispatch = useDispatch();

  // Initialize players
  const player1 = new Player();
  const player2 = new Player();
  const player3 = new Player();

  // Set players names, seat numbers etc.
  player1.setName("Player 1");
  player2.setName("Player 2");
  player3.setName("Player 3");

  // Add players to state
  dispatch({ type: "ADD_PLAYER", payload: player1 });
  dispatch({ type: "ADD_PLAYER", payload: player2 });
  dispatch({ type: "ADD_PLAYER", payload: player3 });

  const players = useSelector((state) => state.Players);

  // Deal cards
  const deck = createDeck(Cards);
  const hands = dealCards(deck, 3);

  // Set player hands in state <= put in function later
  let i = 0;

  Object.keys(players).forEach((player) => {
    dispatch({
      type: "SET_PLAYER_HAND",
      payload: { name: player, newHand: hands[i] },
    });
    i++;
  });

  // Set table
  dispatch({ type: "SET_TABLE", payload: hands[3] });

  // Ask in ascending seat order whether to take table / become the Big One of the game
  // Keep count of remaining moves
  // Determine result
  // Initialize new game / Deal cards

  return (
    <div className="gameScreen">
      <PlayerHand playerHand={players[player1.name].hand} seat={1} />
      <OpponentHand opponentHand={players[player2.name].hand} seat={2} />
      <OpponentHand opponentHand={players[player3.name].hand} seat={3} />
      <TableHand />
      <MoveCards />
    </div>
  );
};

export default GameScreen;
