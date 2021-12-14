import React from "react";
import "./BigOneCards.scss";
import { useSelector } from "react-redux";

const BigOneCards = () => {
  const { bigStack } = useSelector((state) => state.Game);

  return (
    <div className="bigOnesCards">
      {bigStack.map((card) => (
        <Card
          cardId={card.id}
          path={`../../src/assets/card-back.png`}
          key={card.id}
        />
      ))}
    </div>
  );
};

export default BigOneCards;
