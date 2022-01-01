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
          cardId={card.id}
          path={`../../src/assets/card-back.png`}
          key={card.id}
          owner={"stack"}
        />
      ))}
    </div>
  );
};

export default TableHand;
