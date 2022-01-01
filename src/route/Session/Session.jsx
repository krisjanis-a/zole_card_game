import React from "react";
import GameScreen from "../../component/GameScreen/GameScreen";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SessionSetup from "../../component/SessionSetup/SessionSetup";

// Actions
import { resetCollectiveDues } from "../../store/DuesCollective/DuesCollective.action";
import { resetPersonalDues } from "../../store/DuesPersonal/DuesPersonal.action";
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
import { resetScoreboard } from "../../store/Scoreboard/Scoreboard.action";
import { resetBigStack } from "../../store/BigStack/BigStack.action";

const Session = () => {
  const dispatch = useDispatch();

  const { startingSeat } = useSelector((state) => state.Session);
  const players = useSelector((state) => state.Players);
  const gamePhase = useSelector((state) => state.RoundPhase.currentPhase);
  const { sessionRunning } = useSelector((state) => state.Session);

  const endSession = () => {
    // Reset dues
    dispatch(resetCollectiveDues());
    dispatch(resetPersonalDues());

    // Reset move & move cards
    dispatch(resetMove());
    dispatch(resetMoveCards());

    // Reset players
    dispatch(resetPlayers());

    // Reset round
    dispatch(resetRound());
    dispatch(resetRoundPhase());
    dispatch(resetRoundResult());
    dispatch(resetRoundType());

    // Reset scoreboard
    dispatch(resetScoreboard());

    // Reset session
    dispatch(resetSession());
    dispatch(resetSessionMode());

    // Reset table, stacks & tricks
    dispatch(clearTable());
    dispatch(resetBigStack());
    dispatch(resetSmallStack());
    dispatch(resetTableStack());
    dispatch(resetTrickCounts());
  };

  const restartRound = () => {
    // Reset round running/finished, move count, current seat, choose big turn, big one wins small zole parameters
    dispatch(setRoundRunning(false));
    dispatch(setRoundFinished(false));
    dispatch(resetMoveCount());
    dispatch(setAllPlayersPassed(false));
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

  const toResultPhase = () => {
    if (gamePhase === "MAKING_MOVES") {
      dispatch(setMakingMovesPhase(false));
      dispatch(setResultsPhase(true));
    }

    if (gamePhase === "RESULTS") {
      dispatch(setMakingMovesPhase(true));
      dispatch(setResultsPhase(false));
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
