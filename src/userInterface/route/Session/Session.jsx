import React from "react";
import GameScreen from "../../component/GameScreen/GameScreen";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Session = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.Players);

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
    });
  };

  return (
    <div className="session">
      <GameScreen />
      <Link to="/">
        <Button buttonName="Return to Menu" type="main" onClick={endSession} />
      </Link>
      <Button buttonName="Reset game" type="secondary" onClick={resetGame} />
    </div>
  );
};

export default Session;
