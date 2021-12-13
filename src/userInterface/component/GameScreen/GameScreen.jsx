import React, { useEffect, useState } from "react";
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
import cardIdToCard from "../../../engine/Utils/cardIdToCard";
import PromptBig from "../PromptBig/PromptBig";

const GameScreen = () => {
  const dispatch = useDispatch();

  const { gameRunning, currentSeat, chooseBigTurn, playerNames } = useSelector(
    (state) => state.Game
  );

  const players = useSelector((state) => state.Players);

  const [showChooseBigPrompt, setShowChooseBigPrompt] = useState(true);

  //=======================================================================================

  //! SESSION INITIALIZATION

  useEffect(() => {
    dispatch({ type: "INITIALIZE_SESSION" });

    // Initialize players

    const player1 = new Player();
    const player2 = new Player();
    const player3 = new Player();

    // Set players names, seat numbers etc.
    player1.setName("Arnold");
    player2.setName("Bob");
    player3.setName("Cornelius");

    dispatch({
      type: "SET_PLAYER_NAMES",
      payload: [player1.name, player2.name, player3.name],
    });

    player1.setSeat(1);
    player2.setSeat(2);
    player3.setSeat(3);

    // Add players to state
    dispatch({ type: "ADD_PLAYER", payload: player1 });
    dispatch({ type: "ADD_PLAYER", payload: player2 });
    dispatch({ type: "ADD_PLAYER", payload: player3 });

    if (!chooseBigTurn) {
      dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: 1 });
    }
  }, []);

  //=======================================================================================

  //! GAME INITIALIZATION

  useEffect(() => {
    if (Object.entries(players).length > 0) {
      // Deal cards
      const deck = createDeck(Cards);
      const hands = dealCards(deck, 3);

      // Set player hands in state <= put in function later

      const playersArr = Object.entries(players);

      for (let i = 0; i < playersArr.length; i++) {
        const player = playersArr[i][1].name;
        const hand = hands[i].map((id) => cardIdToCard(id));

        dispatch({
          type: "SET_PLAYER_HAND",
          payload: { name: player, newHand: hand },
        });
      }

      // Set table
      dispatch({
        type: "SET_TABLE",
        payload: hands[3].map((id) => cardIdToCard(id)),
      });

      dispatch({ type: "SET_GAME_RUNNING", payload: true });
    }
  }, [players]);

  // Keep count of remaining moves
  // Determine result
  // Initialize new game / Deal cards

  return (
    <div className="gameScreen">
      {gameRunning ? (
        <div>
          <PlayerHand
            playerHand={players[playerNames[0]].hand}
            seat={1}
            active={currentSeat === 1}
          />
          <OpponentHand
            opponentHand={players[playerNames[1]].hand}
            seat={2}
            active={currentSeat === 2}
          />
          <OpponentHand
            opponentHand={players[playerNames[2]].hand}
            seat={3}
            active={currentSeat === 3}
          />
          <TableHand />
          <MoveCards />
        </div>
      ) : null}
      {showChooseBigPrompt ? (
        <PromptBig setShowChooseBigPrompt={setShowChooseBigPrompt} />
      ) : null}
    </div>
  );
};

export default GameScreen;
