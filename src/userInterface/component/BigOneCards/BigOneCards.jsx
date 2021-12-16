import React from "react";
import "./BigOneCards.scss";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

const BigOneCards = () => {
  const { bigStack } = useSelector((state) => state.Game);

  return (
    <div className="bigOnesCards">
      {bigStack.map((card, index) => (
        <Card
          cardId={card.id}
          path={`../../src/assets/card-back.png`}
          key={card.id}
          owner={"stack"}
          stackIndex={index}
        />
      ))}
    </div>
  );
};

export default BigOneCards;
