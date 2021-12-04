import React from "react";
import "./TableHand.scss";
import Card from "../Card/Card";

const TableHand = ({ tableCards }) => {
  return (
    <div className="tableHand">
      {tableCards.map((card) => (
        <Card
          cardId={card}
          path={`../../src/assets/card-back.png`}
          key={card}
        />
      ))}
    </div>
  );
};

export default TableHand;
