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
import Player from "../../models/Player";
import Cards from "../../data/Cards";
import createDeck from "../../utils/createDeck";
import dealCards from "../../utils/dealCards";
import cardIdToCard from "../../utils/cardIdToCard";
import getWinningCard from "../../utils/getWinningCard";

// Prompts / Information displays
import PromptBig from "../PromptBig/PromptBig";
import PromptBury from "../PromptBury/PromptBury";
import GameResult from "../GameResult/GameResult";

// Actions
import { setActivePlayer } from "../../store/ActivePlayer/ActivePlayer.action";
import { addCardToBigStack } from "../../store/BigStack/BigStack.action";
import { addCollectiveDue } from "../../store/DuesCollective/DuesCollective.action";
import { nextMoveTurn, setAskingCard } from "../../store/Move/Move.action";
import { addMoveCard } from "../../store/MoveCards/MoveCards.action";
import {
  addPlayer,
  addTableToPlayerHand,
  removeCardFromHand,
  setBig,
  setPlayerHand,
} from "../../store/Players/Players.action";
import {
  nextSeat,
  setAllPlayersPassed,
  setChooseBigTurn,
  setComputerPerformAction,
  setCurrentSeatToStartingSeat,
  setInitializeRound,
  setRoundFinished,
  setRoundRunning,
} from "../../store/Round/Round.actions";
import {
  setBuryingPhase,
  setChoosingBigPhase,
  setMakingMovesPhase,
  setResultsPhase,
  setRoundPhase,
} from "../../store/RoundPhase/RoundPhase.action";
import { setRoundResult } from "../../store/RoundResult/RoundResult.action";
import { setPlayTable } from "../../store/RoundType/RoundType.action";
import { updateScoreboard } from "../../store/Scoreboard/Scoreboard.action";
import {
  addRoundPlayed,
  nextStartingSeat,
  setPlayerNames,
} from "../../store/Session/Session.action";
import { clearTable, setTable } from "../../store/TableCards/Table.action";

// Util functions
import getRoundResult from "../../utils/getRoundResults";
import getPlayerScores from "../../utils/getPlayerScores";
import chooseMoveCard from "../../utils/chooseMoveCard";
import decideCardsToBury from "../../utils/decideCardsToBury";
import decideBecomeBig from "../../utils/decideBecomeBig";
import setupNextRound from "../../utils/setupNextRound";
import resetRound from "../../utils/resetRoundGS";
import addWinningCardsToStack from "../../utils/addWinningCardsToStack";
import setupNextMove from "../../utils/setupNextMove";

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
      if (Object.values(players).length > 0) {
        // Deal cards
        const deck = createDeck(Cards);
        const hands = dealCards(deck, 3);

        // Set player hands in state
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

      addWinningCardsToStack(
        dispatch,
        winningCard.owner,
        moveCards,
        playTable,
        playSmallZole,
        tableMode
      );
      setupNextMove(dispatch, winningCard, players, playSmallZole);
    }
  }, [moveCards.length]);

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
            resetRound(dispatch, players, startingSeat);
          }

          if (tableMode) {
            dispatch(setPlayTable(true));
          }
        }, 1500);
      }
    }
  }, [chooseBigTurn]);

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
        smallTrickCount,
        playTable,
        playSmallZole,
        playZole,
        bigOneWinsSmallZole
      );
      dispatch(updateScoreboard(score));

      setTimeout(() => {
        setupNextRound(dispatch, players, startingSeat);
      }, 2000);
    }
  }, [roundFinished]);

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
