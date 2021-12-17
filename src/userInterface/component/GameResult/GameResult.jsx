import React from "react";
import "./GameResults.scss";
import { useSelector } from "react-redux";

const GameResult = () => {
  const result = useSelector((state) => state.Game.gameScore);

  return (
    <div className="gameResult">
      <h3>Result</h3>
      <h4>{`Big one score: ${result.bigOneScore}`}</h4>
      <h4>{`Small ones score: ${result.smallOnesScore}`}</h4>
    </div>
  );
};

export default GameResult;
