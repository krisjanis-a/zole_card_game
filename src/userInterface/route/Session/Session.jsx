import React from "react";
import GameScreen from "../../component/GameScreen/GameScreen";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SessionSetup from "../../component/SessionSetup/SessionSetup";

const Session = () => {
  const dispatch = useDispatch();

  const { startingSeat } = useSelector((state) => state.Session);
  const players = useSelector((state) => state.Players);
  const gamePhase = useSelector((state) => state.RoundPhase.currentPhase);
  const { sessionRunning } = useSelector((state) => state.Session);

  const endSession = () => {
    // Reset dues
    dispatch({ type: "RESET_COLLECTIVE_DUES" });
    dispatch({ type: "RESET_PERSONAL_DUES" });

    // Reset move & move cards
    dispatch({ type: "RESET_MOVE" });
    dispatch({ type: "RESET_MOVE_CARDS" });

    // Reset players
    dispatch({ type: "RESET_PLAYERS" });

    // Reset round
    dispatch({ type: "RESET_ROUND" });
    dispatch({ type: "RESET_ROUND_PHASE" });
    dispatch({ type: "RESET_ROUND_RESULT" });
    dispatch({ type: "RESET_ROUND_TYPE" });

    // Reset scoreboard
    dispatch({ type: "RESET_SCOREBOARD" });

    // Reset session
    dispatch({ type: "RESET_SESSION" });
    dispatch({ type: "RESET_SESSION_MODE" });

    // Reset table, stacks & tricks
    dispatch({ type: "CLEAR_TABLE" });
    dispatch({ type: "RESET_BIG_STACK" });
    dispatch({ type: "RESET_SMALL_STACK" });
    dispatch({ type: "RESET_TABLE_STACK" });
    dispatch({ type: "RESET_TRICK_COUNTS" });
  };

  const resetRound = () => {
    // Reset round running/finished, move count, current seat, choose big turn, big one wins small zole parameters
    dispatch({ type: "SET_ROUND_RUNNING", payload: false });
    dispatch({ type: "SET_ROUND_FINISHED", payload: false });
    dispatch({ type: "RESET_MOVE_COUNT" });
    dispatch({
      type: "SET_CURRENT_SEAT_TO_STARTING_SEAT",
      payload: startingSeat,
    });
    dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: null });
    dispatch({ type: "SET_BIG_WINS_SMALL_ZOLE", payload: false });
    dispatch({ type: "SET_ALL_PLAYERS_PASSED", payload: false });

    // Reset round phase, score & type
    dispatch({ type: "RESET_ROUND_PHASE" });
    dispatch({ type: "RESET_ROUND_RESULT" });
    dispatch({ type: "RESET_ROUND_TYPE" });
    dispatch({ type: "RESET_MOVE" });
    dispatch({ type: "RESET_MOVE_CARDS" });

    // Reset table, stacks & tricks
    dispatch({ type: "CLEAR_TABLE" });
    dispatch({ type: "RESET_BIG_STACK" });
    dispatch({ type: "RESET_SMALL_STACK" });
    dispatch({ type: "RESET_TABLE_STACK" });
    dispatch({ type: "RESET_TRICK_COUNTS" });

    // Reset player's stack and big one parameter
    Object.values(players).forEach((player) => {
      dispatch({ type: "SET_BIG", payload: { name: player.name, big: false } });
      dispatch({ type: "RESET_STACK", payload: player.name });
    });

    // Initialize new round
    dispatch({ type: "INITIALIZE_ROUND", payload: true });
  };

  const toResultPhase = () => {
    if (gamePhase === "MAKING_MOVES") {
      dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: false });
      dispatch({ type: "SET_RESULTS_PHASE", payload: true });
    }

    if (gamePhase === "RESULTS") {
      dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: true });
      dispatch({ type: "SET_RESULTS_PHASE", payload: false });
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
            onClick={resetRound}
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
