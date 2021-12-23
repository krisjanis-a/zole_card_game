import React from "react";
import "./GameResults.scss";
import { useSelector } from "react-redux";

const GameResult = () => {
  const result = useSelector((state) => state.RoundScore);
  const players = useSelector((state) => state.Players);

  console.log(result);

  const { playTable } = useSelector((state) => state.RoundType);
  const { tableMode } = useSelector((state) => state.SessionMode);

  return (
    <div className="gameResult">
      <h3>Result</h3>
      {playTable && tableMode ? (
        Object.values(players).map((player) => (
          <div className="playerScore" key={player.name}>
            <p>
              {`${player.name}'s score: ${player.stack.reduce(
                (score, card) => score + card.value,
                0
              )}`}
            </p>
          </div>
        ))
      ) : (
        <>
          <h4>{`Big one score: ${result.bigOneScore}`}</h4>
          <h4>{`Small ones score: ${result.smallOnesScore}`}</h4>
        </>
      )}
    </div>
  );
};

export default GameResult;
