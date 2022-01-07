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

// Prompts / Information displays
import PromptBig from "../PromptBig/PromptBig";
import PromptBury from "../PromptBury/PromptBury";
import GameResult from "../GameResult/GameResult";

// Actions
import { setActivePlayer } from "../../store/ActivePlayer/ActivePlayer.action";
import { addCardToBigStack } from "../../store/BigStack/BigStack.action";
import { addCollectiveDue } from "../../store/DuesCollective/DuesCollective.action";
import {
  nextMoveTurn,
  setAskingCard,
  setMoveInProcess,
} from "../../store/Move/Move.action";
import { addMoveCard } from "../../store/MoveCards/MoveCards.action";
import {
  addTableToPlayerHand,
  removeCardFromHand,
  setBig,
} from "../../store/Players/Players.action";
import {
  nextSeat,
  setAllPlayersPassed,
  setChooseBigTurn,
  setComputerPerformAction,
  setCurrentSeatToStartingSeat,
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
} from "../../store/Session/Session.action";
import { clearTable } from "../../store/TableCards/Table.action";

// Util functions
import getRoundResult from "../../utils/getRoundResults";
import getPlayerScores from "../../utils/getPlayerScores";
import chooseMoveCard from "../../utils/chooseMoveCard";
import decideCardsToBury from "../../utils/decideCardsToBury";
import decideBecomeBig from "../../utils/decideBecomeBig";
import setupNextRound from "../../utils/setupNextRound";
import resetRound from "../../utils/resetRoundGS";
import setupNextMove from "../../utils/setupNextMove";
import performRoundInitialization from "../../utils/performRoundInitialization";
import performSessionInitialization from "../../utils/performSessionInitialization";
import getWinningCard from "../../utils/getWinningCard";
import { addTimeoutToStorage } from "../../utils/timeoutsOperations";

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
    shouldInitializeRound,
    roundRunning,
    roundFinished,
    currentSeat,
    chooseBigTurn,
    bigOneWinsSmallZole,
    computerPerformAction,
  } = useSelector((state) => state.Round);
  const players = useSelector((state) => state.Players);
  const { askingCard, moveTurn, moveInProcess } = useSelector(
    (state) => state.Move
  );
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
    performSessionInitialization(dispatch, ["Arnold", "Bob", "Carl"]);
  }, []);

  //=======================================================================================

  //! ROUND INITIALIZATION

  useEffect(() => {
    if (shouldInitializeRound) {
      performRoundInitialization(
        dispatch,
        players,
        startingSeat,
        chooseBigTurn
      );
    }
  }, [shouldInitializeRound]);

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
      if (moveInProcess === false) {
        dispatch(setMoveInProcess(true));
      }
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

  // Check if all players passed in choosing big
  useEffect(() => {
    if (choosingBigPhase) {
      if (chooseBigTurn > 3) {
        dispatch(setAllPlayersPassed(true));

        const delayFinalizeChoosingBig = setTimeout(() => {
          dispatch(setChoosingBigPhase(false));

          if (normalMode) {
            dispatch(setRoundFinished(true));
            dispatch(addCollectiveDue());
            dispatch(updateScoreboard("Collective Due"));
            dispatch(addRoundPlayed());
            dispatch(nextStartingSeat());
            resetRound(dispatch, players, startingSeat);
          }

          if (tableMode) {
            dispatch(setCurrentSeatToStartingSeat(startingSeat));
            dispatch(setMakingMovesPhase(true));
            dispatch(setPlayTable(true));
          }
        }, 1500);
        addTimeoutToStorage(delayFinalizeChoosingBig);
      }
    }
  }, [chooseBigTurn]);

  // Finalize move
  useEffect(() => {
    if (moveTurn === 3 && moveCards.length === 3) {
      dispatch(setMoveInProcess(false));
      const winningCard = getWinningCard(moveCards);

      console.log("/|\\/|\\/|\\/|\\/|\\/|\\/|\\");
      console.log("Finalizing move");
      console.log(
        `Winner: ${winningCard.owner.name}, winning card: ${winningCard.card.name}`
      );

      if (smallZoleMode && playSmallZole && winningCard.owner.big) {
        dispatch(setMakingMovesPhase(false));
        dispatch(setResultsPhase(true));
      }

      const delaySetupNextMove = setTimeout(() => {
        setupNextMove(
          dispatch,
          winningCard,
          players,
          playSmallZole,
          moveCards,
          playTable,
          tableMode
        );
      }, 1500);
      addTimeoutToStorage(delaySetupNextMove);
    }
  }, [moveTurn, moveCards.length]);

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

      const delaySetupNextRound = setTimeout(() => {
        setupNextRound(dispatch, players, startingSeat);
      }, 2000);

      addTimeoutToStorage(delaySetupNextRound);
    }
  }, [roundFinished]);

  //=======================================================================================

  //! COMPUTER PLAYER LOGIC

  // Check if active player is computer => if yes, set computer perform action to true, if not - false
  useEffect(() => {
    if (activePlayer.isComputer) {
      dispatch(setComputerPerformAction(true));
    }
    if (!activePlayer.isComputer) {
      dispatch(setComputerPerformAction(false));
    }
  }, [activePlayer]);

  // Computer choose big
  const computerChooseBig = (decisionTime) => {
    // console.log(`Current phase ${currentPhase}`);
    // console.log(`Computer player ${activePlayer.name} choosing big`);

    const delayComputerDecideBecomeBig = setTimeout(() => {
      const becomeBig = decideBecomeBig(activePlayer.hand);
      // console.log(
      //   `${activePlayer.name} decided ${
      //     becomeBig ? "to become big" : "to pass"
      //   }`
      // );

      if (becomeBig) {
        // Set big and add table to hand
        dispatch(setBig(activePlayer.name, true));
        dispatch(addTableToPlayerHand(activePlayer.name, table));
        dispatch(clearTable());
        dispatch(setChoosingBigPhase(false));
        dispatch(setBuryingPhase(true));
      }

      if (!becomeBig) {
        if (chooseBigTurn < 3) {
          dispatch(nextSeat());
          dispatch(setChooseBigTurn(chooseBigTurn + 1));
        }
        if (chooseBigTurn === 3) {
          dispatch(setChooseBigTurn(chooseBigTurn + 1));
        }
      }
    }, decisionTime);

    addTimeoutToStorage(delayComputerDecideBecomeBig);
  };

  // Computer bury cards
  const computerBuryCards = (decisionTime) => {
    // console.log(`Current phase ${currentPhase}`);
    // if (activePlayer.big) {
    //   console.log(`${activePlayer.name} choosing cards to bury`);
    // }

    const delayComputerDecideBuryCards = setTimeout(() => {
      if (activePlayer.big) {
        const buryCards = decideCardsToBury(activePlayer.hand);

        buryCards.forEach((card) => {
          dispatch(addCardToBigStack(card));
          dispatch(removeCardFromHand(activePlayer.name, card.id));
        });
      }
    }, decisionTime);

    addTimeoutToStorage(delayComputerDecideBuryCards);
  };

  // Computer make move
  const computerMakeMove = (decisionTime) => {
    // console.log(`Current phase ${currentPhase}`);
    // console.log(`${activePlayer.name} choosing move cards`);
    const delayComputerMakeMove = setTimeout(() => {
      //    - Get valid card choices
      //    - Evaluate which card to use in the move (if multiple options => choose randomly for now)
      const card = chooseMoveCard(
        activePlayer.hand,
        askingCard,
        moveCards,
        activePlayer
      );

      // console.log(`${activePlayer.name} chose move card ${card.name}`);

      //    - Add card to move cards
      if (moveCards.every((moveCard) => moveCard.id !== card.id)) {
        if (moveTurn === 1) {
          dispatch(setAskingCard(card));
        }
        dispatch(addMoveCard(card, activePlayer));
        dispatch(removeCardFromHand(activePlayer.name, card.id));

        if (moveTurn < 3) {
          dispatch(nextSeat());
          dispatch(nextMoveTurn());
        }
      }
    }, decisionTime);

    addTimeoutToStorage(delayComputerMakeMove);
  };

  // Execute computer action
  useEffect(() => {
    // If active player is computer and should perform action
    if (activePlayer.isComputer && computerPerformAction) {
      // Random decision time for computer (in miliseconds)
      const decisionTime = 1000 + Math.random() * 2000;

      // console.log("|=|=|=|=|=|=|=|=|=|=|=|");
      // console.log(`Decision time: ${decisionTime}`);
      // console.log(`Move in process: ${moveInProcess}`);
      // console.log(
      //   `Active player: ${activePlayer.name}, pc perform action: ${computerPerformAction}`
      // );

      // If choose big phase => evaluate cards on hand and decide whether to pick table, play zole or small zole
      if (choosingBigPhase) {
        computerChooseBig(decisionTime);
      }
      // ---
      // If pick table, decide which cards to bury.
      if (buryingCardsPhase) {
        computerBuryCards(decisionTime);
      }
      // ---
      // If make moves phase =>
      if (makingMovesPhase && moveInProcess) {
        computerMakeMove(decisionTime);
      }
    }
  }, [
    activePlayer,
    computerPerformAction,
    currentPhase,
    moveTurn,
    moveInProcess,
  ]);

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
