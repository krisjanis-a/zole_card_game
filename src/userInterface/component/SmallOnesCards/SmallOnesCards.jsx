import React from "react";
import "./SmallOnesCards.scss";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

const SmallOnesCards = () => {
  const { smallStack } = useSelector((state) => state.Game);

  return (
    <div className="smallOnesCards">
      {smallStack.map((card) => (
        <Card
          cardId={card.id}
          path={`../../src/assets/card-back.png`}
          key={card.id}
          owner={"stack"}
        />
      ))}
    </div>
  );
};

export default SmallOnesCards;
