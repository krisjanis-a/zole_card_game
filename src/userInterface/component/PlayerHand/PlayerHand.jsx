import "./PlayerHand.scss";
import React from "react";
import Card from "../Card/Card";
import { useDispatch } from "react-redux";

const PlayerHand = ({ playerHand, seat, active }) => {
  playerHand = playerHand
    .map((card) => card.id) // Card => id
    .sort((a, b) => a - b) // sort cards according to id
    .map((id) => {
      return playerHand.filter((item) => item.id === id)[0];
    }); // id => Card

  return (
    <div className="playerHand">
      {playerHand.map((card) => (
        <Card
          cardId={card.id}
          path={`../../src/assets/CardSet/${card.id}.png`}
          key={card.id}
        />
      ))}
    </div>
  );
};

export default PlayerHand;
