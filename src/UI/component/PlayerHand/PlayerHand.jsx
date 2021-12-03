import "./PlayerHand.scss";
import React from "react";
import Card from "../Card/Card";

const PlayerHand = ({ playerHand }) => {
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
