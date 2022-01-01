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

// Actions
import { setActivePlayer } from "../../store/ActivePlayer/ActivePlayer.action";
import {
  addCardToBigStack,
  resetBigStack,
} from "../../store/BigStack/BigStack.action";
import { addCollectiveDue } from "../../store/DuesCollective/DuesCollective.action";
import {
  nextMoveTurn,
  resetMove,
  setAskingCard,
} from "../../store/Move/Move.action";
import {
  addMoveCard,
  resetMoveCards,
} from "../../store/MoveCards/MoveCards.action";
import {
  addCardsToStack,
  addPlayer,
  addTableToPlayerHand,
  removeCardFromHand,
  resetStack,
  setBig,
  setPlayerHand,
} from "../../store/Players/Players.action";
import {
  addMoveCount,
  nextSeat,
  resetMoveCount,
  setAllPlayersPassed,
  setBigWinsSmallZole,
  setChooseBigTurn,
  setComputerPerformAction,
  setCurrentSeat,
  setCurrentSeatToStartingSeat,
  setInitializeRound,
  setRoundFinished,
  setRoundRunning,
} from "../../store/Round/Round.actions";
import {
  resetRoundPhase,
  setBuryingPhase,
  setChoosingBigPhase,
  setMakingMovesPhase,
  setResultsPhase,
  setRoundPhase,
} from "../../store/RoundPhase/RoundPhase.action";
import {
  resetRoundResult,
  setRoundResult,
} from "../../store/RoundResult/RoundResult.action";
import {
  resetRoundType,
  setPlayTable,
} from "../../store/RoundType/RoundType.action";
import { updateScoreboard } from "../../store/Scoreboard/Scoreboard.action";
import {
  addRoundPlayed,
  nextStartingSeat,
  setPlayerNames,
} from "../../store/Session/Session.action";

import {
  addCardToSmallStack,
  resetSmallStack,
} from "../../store/SmallStack/SmallStack.action";
import { clearTable, setTable } from "../../store/TableCards/Table.action";
import { resetTableStack } from "../../store/TableStack/TableStack.action";
import {
  addBigTrickCount,
  addSmallTrickCount,
  resetTrickCounts,
} from "../../store/Tricks/Tricks.action";

const GameScreen = () => {
  const dispatch = useDispatch();

  const activePlayer = useSelector((state) => state.ActivePlayer);

  const { startingSeat } = useSelector((state) => state.Session);

  const { normalMode, smallZoleMode, tableMode } = useSelector(
    (state) => state.SessionMode
  );

  const {
    buryingCardsPhase,
    choosingBigPhase,
    makingMovesPhase,
    resultsPhase,
    currentPhase,
  } = useSelector((state) => state.RoundPhase);

  const { playZole, playTable, playSmallZole } = useSelector(
    (state) => state.RoundType
  );

  const roundResult = useSelector((state) => state.RoundResult);

  const {
    initializeRound,
    roundRunning,
    roundFinished,
    currentSeat,
    chooseBigTurn,
    bigOneWinsSmallZole,
    computerPerformAction,
  } = useSelector((state) => state.Round);

  const players = useSelector((state) => state.Players);
  const { askingCard, moveTurn } = useSelector((state) => state.Move);
  const moveCards = useSelector((state) => state.MoveCards);

  const bigStack = useSelector((state) => state.BigStack);
  const smallStack = useSelector((state) => state.SmallStack);

  const { smallTrickCount, bigTrickCount } = useSelector(
    (state) => state.Tricks
  );

  const table = useSelector((state) => state.Table);

  const [showChooseBigPrompt, setShowChooseBigPrompt] = useState(false);
  const [showBuryCardsPrompt, setShowBuryCardsPrompt] = useState(false);
  const [showGameResult, setShowGameResult] = useState(false);

  //=======================================================================================

  //! SESSION INITIALIZATION

  useEffect(() => {
    // Initialize players

    const player1 = new Player();
    const player2 = new Player();
    const player3 = new Player();

    // Set players names, seat numbers etc.
    player1.setName("Arnold");
    player2.setName("Bob");
    player3.setName("Cornelius");

    player2.setIsComputer(true);
    player3.setIsComputer(true);

    dispatch(setPlayerNames([player1.name, player2.name, player3.name]));

    player1.setSeat(1);
    player2.setSeat(2);
    player3.setSeat(3);

    // Add players to state
    dispatch(addPlayer(player1));
    dispatch(addPlayer(player2));
    dispatch(addPlayer(player3));

    dispatch(setInitializeRound(true));
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
          const playerName = playersArr[i][1].name;
          const hand = hands[i].map((id) => cardIdToCard(id));

          dispatch(setPlayerHand(playerName, hand));
        }

        // Set table
        dispatch(setTable(hands[3].map((id) => cardIdToCard(id))));

        // Finalize round setup
        dispatch(setInitializeRound(false));
        dispatch(setRoundRunning(true));
        dispatch(setChoosingBigPhase(true));
        dispatch(setCurrentSeatToStartingSeat(startingSeat));

        if (!chooseBigTurn) {
          dispatch(setChooseBigTurn(1));
        }
      }
    }
  }, [initializeRound]);

  //=======================================================================================

  //! ROUND PHASES

  // Set round phase
  useEffect(() => {
    if (choosingBigPhase) {
      dispatch(setRoundPhase("CHOOSING_BIG"));
    }
    if (buryingCardsPhase) {
      dispatch(setRoundPhase("BURYING_CARDS"));
    }
    if (makingMovesPhase) {
      dispatch(setRoundPhase("MAKING_MOVES"));
    }
    if (resultsPhase) {
      dispatch(setRoundPhase("RESULTS"));
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

  // Active player (depending on current seat)
  const selectActivePlayer = () => {
    const player = Object.values(players).filter(
      (player) => player.seatNumber === currentSeat
    )[0];

    dispatch(setActivePlayer(player));
  };

  useEffect(() => {
    if (roundRunning) {
      selectActivePlayer();
    }
  }, [currentSeat, roundRunning]);

  // Finalize move
  useEffect(() => {
    if (moveCards.length === 3) {
      const winningCard = getWinningCard(moveCards);

      if (smallZoleMode && playSmallZole && winningCard.owner.big) {
        dispatch(setMakingMovesPhase(false));
        dispatch(setResultsPhase(true));
      }

      setTimeout(() => {
        addWinningCardsToStack(winningCard.owner, moveCards);
        setupNextMove(winningCard, players);
      }, 2000);
    }
  }, [moveCards.length]);

  //  Add winning cards to correct stack
  const addWinningCardsToStack = (winningPlayer, moveCards) => {
    const cards = moveCards.map((card) => card.card);
    if (!playTable && !playSmallZole) {
      if (winningPlayer.big) {
        cards.map((card) => dispatch(addCardToBigStack(card)));
        dispatch(addBigTrickCount());
      }
      if (!winningPlayer.big) {
        cards.map((card) => dispatch(addCardToSmallStack(card)));
        dispatch(addSmallTrickCount());
      }
    }

    // All players pass and playing table
    if (tableMode && playTable) {
      cards.map((card) => {
        dispatch(addCardsToStack(winningPlayer.name, card));
      });
    }
  };

  // Setup next move
  const setupNextMove = (winningCard, players) => {
    // dispatch(setCurrentSeat(null));
    dispatch(resetMoveCards());
    dispatch(addMoveCount());
    dispatch(setAskingCard(null));
    dispatch(setCurrentSeat(winningCard.owner.seatNumber));
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
      dispatch(setMakingMovesPhase(false));
      dispatch(setResultsPhase(true));
      if (playSmallZole) {
        dispatch(setBigWinsSmallZole(true));
      }
    }
  };

  // Check if all players passed in choosing big
  useEffect(() => {
    if (choosingBigPhase) {
      if (chooseBigTurn > 3) {
        dispatch(setAllPlayersPassed(true));

        setTimeout(() => {
          dispatch(setChoosingBigPhase(false));
          dispatch(setMakingMovesPhase(true));

          if (normalMode) {
            dispatch(setRoundFinished(true));
            dispatch(addCollectiveDue());
            dispatch(updateScoreboard("Collective Due"));
            dispatch(addRoundPlayed());
            dispatch(nextStartingSeat());
            resetRound();
          }

          if (tableMode) {
            dispatch(setPlayTable(true));
          }
        }, 1500);
      }
    }
  }, [chooseBigTurn]);

  // Reset round
  const resetRound = () => {
    // Reset round running/finished, move count, current seat, choose big turn, big one wins small zole parameters
    dispatch(setRoundRunning(false));
    dispatch(setRoundFinished(false));
    dispatch(resetMoveCount());
    dispatch(setCurrentSeatToStartingSeat(startingSeat));
    dispatch(setChooseBigTurn(null));
    dispatch(setBigWinsSmallZole(false));
    dispatch(setAllPlayersPassed(false));

    // Reset round phase, result & type
    dispatch(resetRoundPhase());
    dispatch(resetRoundResult());
    dispatch(resetRoundType());
    dispatch(resetMove());
    dispatch(resetMoveCards());

    // Reset table, stacks & tricks
    dispatch(clearTable());
    dispatch(resetBigStack());
    dispatch(resetSmallStack());
    dispatch(resetTableStack());
    dispatch(resetTrickCounts());

    // Reset player's big one parameter
    Object.values(players).forEach((player) => {
      dispatch(setBig(player.name, false));
    });

    // Initialize new round
    dispatch(setInitializeRound(true));
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

  // Deteremine points / score for each player depending on rules, party scores and "pules" (if not playing table)

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

  //=======================================================================================

  //! FINALIZE ROUND - UPDATE SCOREBOARD & DISPLAY RESULTS

  // Round result display phase
  useEffect(() => {
    if (resultsPhase) {
      const roundResult = getRoundResult(bigStack, smallStack);
      dispatch(setRoundResult(roundResult));
      dispatch(setRoundRunning(false));
      dispatch(setRoundFinished(true));
    }
  }, [resultsPhase]);

  // Update scoreboard
  useEffect(() => {
    if (roundFinished && Object.keys(roundResult).length) {
      const score = getPlayerScores(
        players,
        roundResult,
        bigTrickCount,
        smallTrickCount
      );
      dispatch(updateScoreboard(score));

      setTimeout(() => {
        setupNextRound();
      }, 2000);
    }
  }, [roundFinished]);

  // Setup everything for next round
  const setupNextRound = () => {
    // Reset round running/finished, move count, current seat, choose big turn, big one wins small zole parameters
    dispatch(setRoundFinished(false));
    dispatch(addRoundPlayed());
    dispatch(resetMoveCount());
    dispatch(setAllPlayersPassed(false));
    dispatch(nextStartingSeat());
    dispatch(setCurrentSeatToStartingSeat(startingSeat));
    dispatch(setChooseBigTurn(null));
    dispatch(setBigWinsSmallZole(false));

    // Reset round phase, score & type
    dispatch(resetRoundPhase());
    dispatch(resetRoundResult());
    dispatch(resetRoundType());
    dispatch(resetMove());
    dispatch(resetMoveCards());

    // Reset table, stacks & tricks
    dispatch(clearTable());
    dispatch(resetBigStack());
    dispatch(resetSmallStack());
    dispatch(resetTableStack());
    dispatch(resetTrickCounts());

    // Reset player's stack and big one parameter
    Object.values(players).forEach((player) => {
      dispatch(setBig(player.name, false));
      dispatch(resetStack(player.name));
    });

    // Initialize new round
    dispatch(setInitializeRound(true));
  };

  //=======================================================================================

  //! COMPUTER PLAYER LOGIC

  useEffect(() => {
    if (activePlayer.isComputer) {
      dispatch(setComputerPerformAction(true));
    }
  }, [activePlayer, currentPhase]);

  useEffect(() => {
    if (computerPerformAction) {
      // If active player is computer
      if (activePlayer.isComputer) {
        // If choose big phase => evaluate cards on hand and decide whether to pick table, play zole or small zole
        if (choosingBigPhase) {
          const becomeBig = decideBecomeBig(activePlayer.hand);

          if (becomeBig) {
            // Set big and add table to hand
            dispatch(setBig(activePlayer.name, true));
            dispatch(addTableToPlayerHand(activePlayer.name, table));
            dispatch(clearTable());
            dispatch(setChoosingBigPhase(false));
            dispatch(setBuryingPhase(true));
          }

          if (!becomeBig) {
            if (chooseBigTurn < 4) {
              dispatch(setChooseBigTurn(chooseBigTurn + 1));
            }
            dispatch(nextSeat());
          }
        }
        // ---

        // If pick table, decide which cards to bury.
        if (buryingCardsPhase) {
          if (activePlayer.big) {
            const buryCards = decideCardsToBury(activePlayer.hand);

            buryCards.forEach((card) => {
              dispatch(addCardToBigStack(card));
              dispatch(removeCardFromHand(activePlayer.name, card.id));
            });
          }
        }
        // ---

        // If make moves phase =>
        if (makingMovesPhase) {
          //    - Get valid card choices
          //    - Evaluate which card to use in the move (if multiple options => choose randomly for now)
          const card = chooseMoveCard(
            activePlayer.hand,
            askingCard,
            moveCards,
            activePlayer
          );

          //    - Add card to move cards
          if (moveCards.every((moveCard) => moveCard.id !== card.id)) {
            if (moveTurn === 1) {
              dispatch(setAskingCard(card));
            }
            dispatch(addMoveCard(card, activePlayer));
            dispatch(removeCardFromHand(activePlayer.name, card.id));

            dispatch(nextSeat());
            dispatch(nextMoveTurn());
          }
        }
      }
      dispatch(setComputerPerformAction(false));
    }
  }, [computerPerformAction]);

  const decideBecomeBig = (playerHand) => {
    // Parameters that influence the decission
    let trumpCount = 0;
    let trumpStrength = 0;
    let aceCount = 0;

    let pickTable = false;

    // Object of these parameters (maybe not to be used)
    const handParameters = new Object();

    // Scan the hand for parameters
    playerHand.forEach((card) => {
      if (card.isTrump) {
        trumpCount++;
        trumpStrength = trumpStrength + card.strength;
      }

      if (card.nominal === "ace") {
        aceCount++;
      }
    });

    // Populate object
    handParameters.trumpCount = trumpCount;
    handParameters.trumpStrength = trumpStrength;
    handParameters.aceCount = aceCount;

    /* Conditions for taking hand:
      - if there are 5 or more trumps on hand
      - if the trump overall strength is bigger than [...]
      - if there are aces
    */

    if (trumpCount > 4) {
      if (trumpStrength > 61) {
        pickTable = true;
      }
    }

    // console.log(handParameters);
    // console.log(playerHand);

    return pickTable;
  };

  const decideCardsToBury = (playerHand) => {
    const buryCards = playerHand
      .map((card) => card.id) // Card => id
      .sort((a, b) => a - b) // sort cards according to id
      .map((id) => {
        return playerHand.filter((item) => item.id === id)[0];
      }) // id => Card
      .slice(-2);

    return buryCards;
  };

  const chooseMoveCard = (playerHand, askingCard, moveCards, owner) => {
    const validCards = playerHand
      .filter((card) => {
        if (checkIfCardValid(card, askingCard, owner)) {
          return card;
        }
      })
      .map((card) => card.id) // Card => id
      .sort((a, b) => b - a) // sort cards according to id
      .map((id) => {
        return playerHand.filter((item) => item.id === id)[0];
      }); // id => Card;

    let card;

    for (let i = 0; i < validCards.length; i++) {
      if (!askingCard) {
        card = validCards[i];
        break;
      }
      if (validCards[i].strength >= askingCard.strength) {
        card = validCards[i];
        break;
      } else {
        card = validCards[0];
      }
    }

    return card;
  };

  const checkIfCardValid = (card, askingCard, owner) => {
    let cardValid = false;

    if (!askingCard) return (cardValid = true);

    if (askingCard.isTrump && card.isTrump) {
      cardValid = true;
    }

    if (
      !askingCard.isTrump &&
      !card.isTrump &&
      card.suite === askingCard.suite
    ) {
      cardValid = true;
    }

    if (
      askingCard.isTrump &&
      owner.hand.filter((card) => card.isTrump).length === 0
    ) {
      cardValid = true;
    }

    if (
      !askingCard.isTrump &&
      owner.hand.filter(
        (card) => !card.isTrump && card.suite === askingCard.suite
      ).length === 0
    ) {
      cardValid = true;
    }

    return cardValid;
  };

  //=======================================================================================

  //! RENDER

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
