import React from "react";
import Card from "../Card/Card";

const PlayerHand = ({ playerHand }) => {
  return (
    <div>
      {playerHand.map((card) => (
        <Card cardId={card.cardId} />
      ))}
    </div>
  );
};

export default PlayerHand;
