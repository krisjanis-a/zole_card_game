import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GameScreen.scss";

// Game components
import PlayerHand from "../PlayerHand/PlayerHand";
import OpponentHand from "../OpponentHand/OpponentHand";
import TableHand from "../TableHand/TableHand";
import MoveCards from "../MoveCards/MoveCards";
import BigOneCards from "../BigOneCards/BigOneCards";
import SmallOnesCards from "../SmallOnesCards/SmallOnesCards";

// Engine functionality
import Player from "../../../engine/models/Player";
import Cards from "../../../engine/data/Cards";
import createDeck from "../../../engine/utils/createDeck";
import dealCards from "../../../engine/utils/dealCards";
import cardIdToCard from "../../../engine/utils/cardIdToCard";
import getWinningCard from "../../../engine/utils/getWinningCard";

// Prompts / Information displays
import PromptBig from "../PromptBig/PromptBig";
import PromptBury from "../PromptBury/PromptBury";
import GameResult from "../GameResult/GameResult";

const GameScreen = () => {
  const dispatch = useDispatch();

  const { normalMode, smallZoleMode, tableMode } = useSelector(
    (state) => state.SessionMode
  );

  const {
    buryingCardsPhase,
    choosingBigPhase,
    makingMovesPhase,
    resultsPhase,
  } = useSelector((state) => state.RoundPhase);

  const { playZole, playTable, playSmallZole } = useSelector(
    (state) => state.RoundType
  );

  const roundResult = useSelector((state) => state.RoundResult);

  const {
    initializeRound,
    roundRunning,
    roundFinished,
    chooseBigTurn,
    bigOneWinsSmallZole,
  } = useSelector((state) => state.Round);

  const players = useSelector((state) => state.Players);
  const moveCards = useSelector((state) => state.MoveCards);

  const bigStack = useSelector((state) => state.BigStack);
  const smallStack = useSelector((state) => state.SmallStack);

  const { smallTrickCount, bigTrickCount } = useSelector(
    (state) => state.Tricks
  );

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

    dispatch({ type: "INITIALIZE_ROUND", payload: true });
  }, []);

  //=======================================================================================

  //! ROUND INITIALIZATION

  useEffect(() => {
    if (initializeRound) {
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

        dispatch({ type: "INITIALIZE_ROUND", payload: false });
        dispatch({ type: "SET_ROUND_RUNNING", payload: true });
        dispatch({ type: "SET_CHOOSING_BIG_PHASE", payload: true });

        if (!chooseBigTurn) {
          dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: 1 });
        }
      }
    }
  }, [initializeRound]);

  //=======================================================================================

  //! ROUND PHASES

  // Set round phase
  useEffect(() => {
    if (choosingBigPhase) {
      dispatch({ type: "SET_ROUND_PHASE", payload: "CHOOSING_BIG" });
    }
    if (buryingCardsPhase) {
      dispatch({ type: "SET_ROUND_PHASE", payload: "BURYING_CARDS" });
    }
    if (makingMovesPhase) {
      dispatch({ type: "SET_ROUND_PHASE", payload: "MAKING_MOVES" });
    }
    if (resultsPhase) {
      dispatch({ type: "SET_ROUND_PHASE", payload: "RESULTS" });
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

  //=======================================================================================

  //! MANAGE MOVES & TURNS

  // Finalize move

  useEffect(() => {
    if (moveCards.length === 3) {
      const winningCard = getWinningCard(moveCards);

      if (smallZoleMode && playSmallZole && winningCard.owner.big) {
        dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: false });
        dispatch({ type: "SET_RESULTS_PHASE", payload: true });
        dispatch({ type: "SET_ROUND_FINISHED", payload: true });
      }

      addWinningCardsToStack(winningCard.owner, moveCards);
      setupNextMove(winningCard, players);
    }
  }, [moveCards.length]);

  //  Add winning cards to correct stack
  const addWinningCardsToStack = (winningPlayer, moveCards) => {
    const cards = moveCards.map((card) => card.card);
    if (!playTable && !playSmallZole) {
      if (winningPlayer.big) {
        cards.map((card) =>
          dispatch({ type: "ADD_CARD_TO_BIG_STACK", payload: card })
        );
        dispatch({ type: "ADD_BIG_TRICK_COUNT" });
      }
      if (!winningPlayer.big) {
        cards.map((card) =>
          dispatch({ type: "ADD_CARD_TO_SMALL_STACK", payload: card })
        );
        dispatch({ type: "ADD_SMALL_TRICK_COUNT" });
      }
    }

    // All players pass and playing table
    if (tableMode && playTable) {
      cards.map((card) => {
        dispatch({
          type: "ADD_CARDS_TO_STACK",
          payload: { name: winningPlayer.name, card: card },
        });
      });
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
      dispatch({ type: "SET_ROUND_FINISHED", payload: true });

      if (playSmallZole) {
        dispatch({ type: "SET_BIG_WINS_SMALL_ZOLE", payload: true });
      }
    }
  };

  //=======================================================================================

  //! ROUND RESULT CALCULATION

  // Get result for each party
  const getRoundResult = (bigOneStack, smallOnesStack) => {
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

  //=======================================================================================

  //! DETERMINE PLAYER SCORE

  // Update scoreboard for each player depending on rules, party scores and "pules" (if not playing table)

  const getPlayerScores = (
    players,
    roundResult,
    bigOneTrickCount,
    smallOnesTrickCount
  ) => {
    const playerScores = {};
    const bigOneScore = roundResult.bigOneScore;
    const smallOnesScore = roundResult.smallOnesScore;
    Object.values(players).forEach((player) => {
      // Normal mode not playing zole & using collective / personal dues
      if (!playTable && !playSmallZole && !playZole) {
        // Winning cases
        if (bigOneScore >= 61 && bigOneScore <= 90) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = +2;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = -1;
          }
        }

        // "Jaņi" for small ones
        if (bigOneScore >= 91 && smallOnesScore !== 0) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = +4;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = -2;
          }
        }

        // No tricks for small ones - "Bezstiķis"
        if (smallOnesTrickCount === 0) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = +6;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = -3;
          }
        }

        // Losing cases
        if (bigOneScore >= 31 && bigOneScore <= 60) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = -4;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = +2;
          }
        }
        if (bigOneScore <= 30) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = -6;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = +3;
          }
        }

        // No tricks for big one - "Bezstiķis"
        if (bigOneTrickCount === 0) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = -8;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = +4;
          }
        }
      }

      // Normal mode playing zole
      if (!playTable && !playSmallZole && playZole) {
        // Winning cases
        if (bigOneScore >= 61 && bigOneScore <= 90) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = +10;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = -5;
          }
        }

        // "Jaņi" for small ones
        if (bigOneScore >= 91) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = +12;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = -6;
          }
        }

        // No tricks for small ones - "Bezstiķis"
        if (smallOnesTrickCount === 0) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = +14;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = -7;
          }
        }
        // Losing cases
        if (bigOneScore >= 31 && bigOneScore <= 60) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = -12;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = +6;
          }
        }

        // "Jaņi" for big one
        if (bigOneScore <= 30) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = -14;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = +7;
          }
        }
        // No tricks for big one - "Bezstiķis"
        if (bigOneTrickCount === 0) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = -16;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = +8;
          }
        }
      }

      // Small Zole
      if (playSmallZole) {
        // Winning case
        if (bigOneWinsSmallZole) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = +12;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = -6;
          }
        }
        // Losing case
        if (!bigOneWinsSmallZole) {
          if (player.big) {
            const name = player.name;
            playerScores[name] = -14;
          }
          if (!player.big) {
            const name = player.name;
            playerScores[name] = +7;
          }
        }
      }
    });

    // Playing Table
    if (playTable) {
      let maxTricks = 0;
      let tableLoser;

      // Get losing player
      Object.values(players).forEach((player) => {
        const tricks = player.stack.length / 3;

        // In case two players have same amount of tricks
        if (tricks === maxTricks && tricks !== 0) {
          // Player has larger score than the current losing player
          if (
            player.stack.reduce((score, card) => score + card.value, 0) >
            players[tableLoser].stack.reduce(
              (score, card) => score + card.value,
              0
            )
          ) {
            tableLoser = player.name;
          }
        }

        if (tricks > maxTricks) {
          maxTricks = tricks;
          tableLoser = player.name;
        }
      });

      Object.values(players).forEach((player) => {
        if (player.name === tableLoser) {
          playerScores[player.name] = -4;
        }
        if (player.name !== tableLoser) {
          playerScores[player.name] = +2;
        }
      });
    }

    // console.log(playerScores);

    return playerScores;
  };

  //! FINALIZE ROUND - UPDATE SCOREBOARD & DISPLAY RESULTS

  // Round result display phase
  useEffect(() => {
    if (resultsPhase) {
      const roundResult = getRoundResult(bigStack, smallStack);
      dispatch({ type: "SET_ROUND_RESULT", payload: roundResult });
    }
  }, [resultsPhase]);

  useEffect(() => {
    if (roundFinished) {
      const score = getPlayerScores(
        players,
        roundResult,
        bigTrickCount,
        smallTrickCount
      );
      dispatch({ type: "UPDATE_SCOREBOARD", payload: score });
      // dispatch({ type: "SET_GAME_FINISHED", payload: false });
    }
  }, [roundFinished]);

  return (
    <div className="gameScreen">
      {roundRunning ? (
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
