import React from "react";
import Card from "../Card/Card";
import "./OpponentHand.scss";

const OpponentHand = ({ opponentHand, seat }) => {
  return (
    <div className={`opponentHandWrapper seat${seat}`}>
      <div className={`opponentHand seat${seat}`}>
        {opponentHand.map((card) => (
          <Card
            cardId={card}
            path={`../../src/assets/card-back.png`}
            key={card}
          />
        ))}
      </div>
    </div>
  );
};

export default OpponentHand;
