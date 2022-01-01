import React from "react";
import GameScreen from "../../component/GameScreen/GameScreen";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SessionSetup from "../../component/SessionSetup/SessionSetup";
import { resetCollectiveDues } from "../../store/DuesCollective/DuesCollective.action";
import { resetMove } from "../../store/Move/Move.action";
import {
  resetPlayers,
  resetStack,
  setBig,
} from "../../store/Players/Players.action";
import {
  resetMoveCount,
  resetRound,
  setAllPlayersPassed,
  setBigWinsSmallZole,
  setChooseBigTurn,
  setCurrentSeatToStartingSeat,
  setInitializeRound,
  setRoundFinished,
  setRoundRunning,
} from "../../store/Round/Round.actions";
import {
  resetRoundPhase,
  setMakingMovesPhase,
  setResultsPhase,
} from "../../store/RoundPhase/RoundPhase.action";
import { resetRoundResult } from "../../store/RoundResult/RoundResult.action";
import { resetRoundType } from "../../store/RoundType/RoundType.action";
import { resetSession } from "../../store/Session/Session.action";
import { resetSessionMode } from "../../store/SessionMode/SessionMode.action";
import { resetSmallStack } from "../../store/SmallStack/SmallStack.action";
import { clearTable } from "../../store/TableCards/Table.action";
import { resetTableStack } from "../../store/TableStack/TableStack.action";
import { resetTrickCounts } from "../../store/Tricks/Tricks.action";
import { resetMoveCards } from "../../store/MoveCards/MoveCards.action";

const Session = () => {
  const dispatch = useDispatch();

  const { startingSeat } = useSelector((state) => state.Session);
  const players = useSelector((state) => state.Players);
  const gamePhase = useSelector((state) => state.RoundPhase.currentPhase);
  const { sessionRunning } = useSelector((state) => state.Session);

  const endSession = () => {
    // Reset dues
    dispatch(resetCollectiveDues());
    dispatch({ type: "RESET_PERSONAL_DUES" });

    // Reset move & move cards
    dispatch(resetMove());
    dispatch(resetMoveCards());
    // dispatch({ type: "RESET_MOVE_CARDS" });

    // Reset players
    dispatch(resetPlayers());

    // Reset round
    dispatch(resetRound());
    // dispatch({ type: "RESET_ROUND" });
    dispatch(resetRoundPhase());
    // dispatch({ type: "RESET_ROUND_PHASE" });
    dispatch(resetRoundResult());
    // dispatch({ type: "RESET_ROUND_RESULT" });
    dispatch(resetRoundType());
    // dispatch({ type: "RESET_ROUND_TYPE" });

    // Reset scoreboard
    dispatch({ type: "RESET_SCOREBOARD" });

    // Reset session
    dispatch(resetSession());
    // dispatch({ type: "RESET_SESSION" });
    dispatch(resetSessionMode());
    // dispatch({ type: "RESET_SESSION_MODE" });

    // Reset table, stacks & tricks
    dispatch(clearTable());
    // dispatch({ type: "CLEAR_TABLE" });
    dispatch({ type: "RESET_BIG_STACK" });
    dispatch(resetSmallStack());
    // dispatch({ type: "RESET_SMALL_STACK" });
    dispatch(resetTableStack());
    // dispatch({ type: "RESET_TABLE_STACK" });
    dispatch(resetTrickCounts());
    // dispatch({ type: "RESET_TRICK_COUNTS" });
  };

  const restartRound = () => {
    // Reset round running/finished, move count, current seat, choose big turn, big one wins small zole parameters
    dispatch(setRoundRunning(false));
    // dispatch({ type: "SET_ROUND_RUNNING", payload: false });
    dispatch(setRoundFinished(false));
    // dispatch({ type: "SET_ROUND_FINISHED", payload: false });
    // dispatch({ type: "RESET_MOVE_COUNT" });
    dispatch(resetMoveCount());
    dispatch(setAllPlayersPassed(false));
    // dispatch({ type: "SET_ALL_PLAYERS_PASSED", payload: false });
    // dispatch({
    //   type: "SET_CURRENT_SEAT_TO_STARTING_SEAT",
    //   payload: startingSeat,
    // });
    dispatch(setCurrentSeatToStartingSeat(startingSeat));
    dispatch(setChooseBigTurn(null));
    // dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: null });
    dispatch(setBigWinsSmallZole(false));
    // dispatch({ type: "SET_BIG_WINS_SMALL_ZOLE", payload: false });

    // Reset round phase, score & type
    dispatch(resetRoundPhase());
    // dispatch({ type: "RESET_ROUND_PHASE" });
    dispatch(resetRoundResult());
    // dispatch({ type: "RESET_ROUND_RESULT" });
    dispatch(resetRoundType());
    // dispatch({ type: "RESET_ROUND_TYPE" });
    dispatch(resetMove());
    dispatch({ type: "RESET_MOVE_CARDS" });

    // Reset table, stacks & tricks
    dispatch(clearTable());
    // dispatch({ type: "CLEAR_TABLE" });
    dispatch({ type: "RESET_BIG_STACK" });
    dispatch(resetSmallStack());
    // dispatch({ type: "RESET_SMALL_STACK" });
    dispatch(resetTableStack());
    // dispatch({ type: "RESET_TABLE_STACK" });
    dispatch(resetTrickCounts());
    // dispatch({ type: "RESET_TRICK_COUNTS" });

    // Reset player's stack and big one parameter
    Object.values(players).forEach((player) => {
      dispatch(setBig(player.name, false));
      // dispatch({ type: "SET_BIG", payload: { name: player.name, big: false } });
      // dispatch({ type: "RESET_STACK", payload: player.name });
      dispatch(resetStack(player.name));
    });

    // Initialize new round
    // dispatch({ type: "INITIALIZE_ROUND", payload: true });
    dispatch(setInitializeRound(true));
  };

  const toResultPhase = () => {
    if (gamePhase === "MAKING_MOVES") {
      dispatch(setMakingMovesPhase(false));
      // dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: false });
      dispatch(setResultsPhase(true));
      // dispatch({ type: "SET_RESULTS_PHASE", payload: true });
    }

    if (gamePhase === "RESULTS") {
      dispatch(setMakingMovesPhase(true));
      // dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: true });
      dispatch(setResultsPhase(false));
      // dispatch({ type: "SET_RESULTS_PHASE", payload: false });
    }
  };

  return (
    <div className="session">
      {sessionRunning ? (
        <>
          <GameScreen />
          <Link to="/">
            <Button
              buttonName="Return to Menu"
              type="main"
              onClick={endSession}
            />
          </Link>
          <Button
            buttonName="Reset game"
            type="secondary"
            onClick={restartRound}
          />
          <Button
            buttonName="Results phase / Next Round"
            type="secondary"
            onClick={toResultPhase}
          />
        </>
      ) : (
        <SessionSetup />
      )}
    </div>
  );
};

export default Session;
