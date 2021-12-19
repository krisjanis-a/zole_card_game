import React from "react";
import GameScreen from "../../component/GameScreen/GameScreen";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SessionSetup from "../../component/SessionSetup/SessionSetup";

const Session = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.Players);
  const gamePhase = useSelector((state) => state.Game.currentPhase);
  const { sessionRunning } = useSelector((state) => state.Game);

  const endSession = () => {
    dispatch({ type: "RESET_PLAYERS" });
    dispatch({ type: "CLEAR_TABLE" });
    dispatch({ type: "RESET_MOVE_CARDS" });
    dispatch({ type: "END_SESSION" });
  };
  const resetGame = () => {
    dispatch({ type: "CLEAR_TABLE" });
    dispatch({ type: "RESET_MOVE_CARDS" });
    dispatch({ type: "RESET_GAME" });
    Object.values(players).forEach((player) => {
      dispatch({ type: "SET_BIG", payload: { name: player.name, big: false } });
      dispatch({ type: "RESET_STACK", payload: player.name });
    });
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
            onClick={resetGame}
          />
          <Button
            buttonName="Results phase"
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
