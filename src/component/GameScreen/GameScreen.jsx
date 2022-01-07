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
import { addCollectiveDue } from "../../store/DuesCollective/DuesCollective.action";
import { setMoveInProcess } from "../../store/Move/Move.action";
import {
  setAllPlayersPassed,
  setComputerPerformAction,
  setCurrentSeatToStartingSeat,
  setRoundFinished,
  setRoundRunning,
} from "../../store/Round/Round.actions";
import {
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

// Util functions
import getRoundResult from "../../utils/getRoundResults";
import getPlayerScores from "../../utils/getPlayerScores";
import setupNextRound from "../../utils/setupNextRound";
import resetRound from "../../utils/resetRoundGS";
import setupNextMove from "../../utils/setupNextMove";
import performRoundInitialization from "../../utils/performRoundInitialization";
import performSessionInitialization from "../../utils/performSessionInitialization";
import getWinningCard from "../../utils/getWinningCard";
import { addTimeoutToStorage } from "../../utils/timeoutsOperations";
import computerChooseBig from "../../utils/computerChooseBig";
import computerBuryCards from "../../utils/computerDecideBuryCards";
import computerMakeMove from "../../utils/computerMakeMove";
import selectActivePlayer from "../../utils/selectActivePlayer";

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

  // Select active player
  useEffect(() => {
    if (roundRunning) {
      selectActivePlayer(dispatch, players, currentSeat);
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

  // Execute computer action
  useEffect(() => {
    // If active player is computer and should perform action
    if (activePlayer.isComputer && computerPerformAction) {
      // Random decision time for computer (in miliseconds)
      const decisionTime = 1000 + Math.random() * 2000;

      // If choose big phase => evaluate cards on hand and decide whether to pick table, play zole or small zole
      if (choosingBigPhase) {
        computerChooseBig(
          dispatch,
          decisionTime,
          activePlayer,
          chooseBigTurn,
          table
        );
      }
      // ---

      // If pick table, decide which cards to bury.
      if (buryingCardsPhase) {
        computerBuryCards(dispatch, decisionTime, activePlayer);
      }
      // ---

      // If make moves phase =>
      if (makingMovesPhase && moveInProcess) {
        computerMakeMove(
          dispatch,
          decisionTime,
          activePlayer,
          askingCard,
          moveCards,
          moveTurn
        );
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
