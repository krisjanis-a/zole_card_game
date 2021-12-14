import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GameScreen.scss";

import PlayerHand from "../PlayerHand/PlayerHand";
import OpponentHand from "../OpponentHand/OpponentHand";
import TableHand from "../TableHand/TableHand";
import MoveCards from "../MoveCards/MoveCards";
import BigOneCards from "../BigOneCards/BigOneCards";
import SmallOnesCards from "../SmallOnesCards/SmallOnesCards";

import Player from "../../../engine/Models/Player";

import Cards from "../../../engine/Data/Cards";
import createDeck from "../../../engine/Utils/createDeck";
import dealCards from "../../../engine/Utils/dealCards";
import cardIdToCard from "../../../engine/Utils/cardIdToCard";
import PromptBig from "../PromptBig/PromptBig";
import PromptBury from "../PromptBury/PromptBury";

const GameScreen = () => {
  const dispatch = useDispatch();

  const {
    initializeGame,
    gameRunning,
    currentSeat,
    chooseBigTurn,
    playerNames,
    buryingCardsPhase,
    choosingBigPhase,
    makingMovesPhase,
    resultsPhase,
  } = useSelector((state) => state.Game);

  const players = useSelector((state) => state.Players);

  const [showChooseBigPrompt, setShowChooseBigPrompt] = useState(false);
  const [showBuryCardsPrompt, setShowBuryCardsPrompt] = useState(false);

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

    dispatch({ type: "INITIALIZE_GAME", payload: true });
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

      dispatch({ type: "INITIALIZE_GAME", payload: false });
      dispatch({ type: "SET_GAME_RUNNING", payload: true });
      dispatch({ type: "SET_CHOOSING_BIG_PHASE", payload: true });
    }
  }, [initializeGame]);

  // Set game phase
  useEffect(() => {
    if (choosingBigPhase) {
      dispatch({ type: "SET_GAME_PHASE", payload: "CHOOSING_BIG" });
    }
    if (buryingCardsPhase) {
      dispatch({ type: "SET_GAME_PHASE", payload: "BURYING_CARDS" });
    }
    if (makingMovesPhase) {
      dispatch({ type: "SET_GAME_PHASE", payload: "MAKING_MOVES" });
    }
    if (resultsPhase) {
      dispatch({ type: "SET_GAME_PHASE", payload: "RESULTS" });
    }
  }, [choosingBigPhase, buryingCardsPhase, makingMovesPhase, resultsPhase]);

  // Show / Hide dialogs according to game phase
  useEffect(() => {
    if (choosingBigPhase) {
      setShowChooseBigPrompt(true);
    }
  }, [choosingBigPhase]);

  useEffect(() => {
    if (buryingCardsPhase) {
      setShowBuryCardsPrompt(true);
    }
  }, [buryingCardsPhase]);

  // Keep count of remaining moves
  // Determine result
  // Initialize new game / Deal cards

  return (
    <div className="gameScreen">
      {gameRunning ? (
        <div>
          <PlayerHand seat={1} />
          <OpponentHand seat={2} />
          <OpponentHand seat={3} />
          <TableHand />
          <MoveCards />
          <BigOneCards />
          <SmallOnesCards />
        </div>
      ) : null}
      {showChooseBigPrompt ? (
        <PromptBig setShowChooseBigPrompt={setShowChooseBigPrompt} />
      ) : null}
      {showBuryCardsPrompt ? (
        <PromptBury setShowBuryCardsPrompt={setShowBuryCardsPrompt} />
      ) : null}
    </div>
  );
};

export default GameScreen;
