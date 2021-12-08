import React from "react";
import "./TableHand.scss";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const TableHand = () => {
  const tableCards = useSelector((state) => state.Table);

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
