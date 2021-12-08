import "./PlayerHand.scss";
import React from "react";
import Card from "../Card/Card";
import { useDispatch } from "react-redux";

const PlayerHand = ({ playerHand }) => {
  playerHand = playerHand.sort((a, b) => a - b);

  return (
    <div className="playerHand">
      {playerHand.map((card) => (
        <Card
          cardId={card}
          path={`../../src/assets/CardSet/${card}.png`}
          key={card}
        />
      ))}
    </div>
  );
};

export default PlayerHand;
