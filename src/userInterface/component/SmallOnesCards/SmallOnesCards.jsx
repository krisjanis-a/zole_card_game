import React from "react";
import "./SmallOnesCards.scss";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

const SmallOnesCards = () => {
  const smallStack = useSelector((state) => state.SmallStack);
  console.log(smallStack);

  return (
    <div className="smallOnesCards">
      {smallStack.map((card, index) => (
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

export default SmallOnesCards;
