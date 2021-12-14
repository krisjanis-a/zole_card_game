import React, { useEffect } from "react";
import "./MoveCards.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Card from "../Card/Card";

const MoveCards = () => {
  const dispatch = useDispatch();

  const moveCards = useSelector((state) => state.MoveCards);

  return (
    <div className="moveCards">
      {moveCards.map((card, index) => (
        <div key={card.id} className={`moveCard${index}`}>
          <Card
            cardId={card.id}
            path={`../../src/assets/CardSet/${card.id}.png`}
            key={card.id}
          />
        </div>
      ))}
    </div>
  );
};

export default MoveCards;
