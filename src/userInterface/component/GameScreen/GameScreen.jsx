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
import getWinningCard from "../../../engine/Utils/getWinningCard";
import GameResult from "../GameResult/GameResult";

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
    moveCount,
    bigStack,
    smallStack,
  } = useSelector((state) => state.Game);

  const players = useSelector((state) => state.Players);
  const moveCards = useSelector((state) => state.MoveCards);

  const [showChooseBigPrompt, setShowChooseBigPrompt] = useState(false);
  const [showBuryCardsPrompt, setShowBuryCardsPrompt] = useState(false);
  const [showGameResult, setShowGameResult] = useState(false);

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

    // if (!chooseBigTurn) {
    //   dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: 1 });
    // }

    dispatch({ type: "INITIALIZE_GAME", payload: true });
  }, []);

  //=======================================================================================

  //! GAME INITIALIZATION

  useEffect(() => {
    if (initializeGame) {
      // console.log("Initializing the game");
      if (Object.values(players).length > 0) {
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

        if (!chooseBigTurn) {
          dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: 1 });
        }
      }
    }
  }, [initializeGame]);

  //=======================================================================================

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
    if (!choosingBigPhase) {
      setShowChooseBigPrompt(false);
    }
  }, [choosingBigPhase]);

  useEffect(() => {
    if (buryingCardsPhase) {
      setShowBuryCardsPrompt(true);
    }
    if (!buryingCardsPhase) {
      setShowBuryCardsPrompt(false);
    }
  }, [buryingCardsPhase]);

  useEffect(() => {
    if (resultsPhase) {
      setShowGameResult(true);
    }
    if (!resultsPhase) {
      setShowGameResult(false);
    }
  }, [resultsPhase]);

  // Finalize move

  useEffect(() => {
    if (moveCards.length === 3) {
      // console.log("Move done, lets get calculating winner");
      const winningCard = getWinningCard(moveCards);

      addWinningCardsToStack(winningCard.owner, moveCards);
      setupNextMove(winningCard, players);
    }
  }, [moveCards.length]);

  //  Add winning cards to correct stack
  const addWinningCardsToStack = (winningPlayer, moveCards) => {
    const cards = moveCards.map((card) => card.card);
    if (winningPlayer.big) {
      cards.map((card) =>
        dispatch({ type: "ADD_CARD_TO_BIG_STACK", payload: card })
      );
    }
    if (!winningPlayer.big) {
      cards.map((card) =>
        dispatch({ type: "ADD_CARD_TO_SMALL_STACK", payload: card })
      );
    }
  };

  // Setup next move
  const setupNextMove = (winningCard, players) => {
    dispatch({ type: "SET_CURRENT_SEAT", payload: null });
    dispatch({ type: "RESET_MOVE_CARDS" });
    dispatch({ type: "ADD_MOVE_COUNT" });
    dispatch({ type: "SET_ASKING_CARD", payload: null });
    dispatch({
      type: "SET_CURRENT_SEAT",
      payload: winningCard.owner.seatNumber,
    });
    checkIfMovesLeft(players);
  };

  // Keep count of remaining moves => not using this method for now
  // Check if players do not have any more cards in hand
  const checkIfMovesLeft = (players) => {
    if (
      Object.values(players).every((player) => {
        return player.hand.length === 0;
      })
    ) {
      dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: false });
      dispatch({ type: "SET_RESULTS_PHASE", payload: true });
    }
  };

  // Result display phase
  useEffect(() => {
    if (resultsPhase) {
      const gameResult = getGameResult(bigStack, smallStack);
      dispatch({ type: "SET_GAME_RESULT", payload: gameResult });
    }
  }, [resultsPhase]);

  // Get result for each party
  const getGameResult = (bigOneStack, smallOnesStack) => {
    const results = {
      bigOneScore: null,
      smallOnesScore: null,
    };

    results.bigOneScore = bigOneStack.reduce(
      (score, card) => score + card.value,
      0
    );

    results.smallOnesScore = smallOnesStack.reduce(
      (score, card) => score + card.value,
      0
    );

    return results;
  };

  // Update scoreboard for each player depending on rules, party scores and "pules" (if not playing table)

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
      {showBuryCardsPrompt && chooseBigTurn ? (
        <PromptBury setShowBuryCardsPrompt={setShowBuryCardsPrompt} />
      ) : null}
      {showGameResult ? (
        <GameResult setShowGameResult={setShowGameResult} />
      ) : null}
    </div>
  );
};

export default GameScreen;
