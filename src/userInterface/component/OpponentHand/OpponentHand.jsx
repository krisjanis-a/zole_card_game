import React from "react";
import Card from "../Card/Card";
import "./OpponentHand.scss";

const OpponentHand = ({ opponentHand, seat, active }) => {
  opponentHand = opponentHand
    .map((card) => card.id) // Card => id
    .sort((a, b) => a - b) // sort cards according to id
    .map((id) => {
      return opponentHand.filter((item) => item.id === id)[0];
    }); // id => Card

  return (
    <div className={`opponentHandWrapper seat${seat}`}>
      <div className={`opponentHand seat${seat}`}>
        {opponentHand.map((card) => (
          <Card
            cardId={card.id}
            path={`../../src/assets/CardSet/${card.id}.png`}
            // path={`../../src/assets/card-back.png`}
            key={card.id}
          />
        ))}
      </div>
    </div>
  );
};

export default OpponentHand;
