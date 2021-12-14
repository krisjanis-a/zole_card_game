import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import "./OpponentHand.scss";

const OpponentHand = ({ seat }) => {
  const players = useSelector((state) => state.Players);

  const player = Object.values(players).filter(
    (player) => player.seatNumber === seat
  )[0];

  const opponentHand = player.hand
    .map((card) => card.id) // Card => id
    .sort((a, b) => a - b) // sort cards according to id
    .map((id) => {
      return player.hand.filter((item) => item.id === id)[0];
    }); // id => Card

  return (
    <div className={`opponentHandWrapper seat${seat}`}>
      <div className={`opponentHand seat${seat}`}>
        {opponentHand.map((card) => (
          <Card
            cardId={card.id}
            path={`../../src/assets/CardSet/${card.id}.png`}
            // path={`../../src/assets/card-back.png`}
            key={card.id}
            owner={player}
          />
        ))}
      </div>
    </div>
  );
};

export default OpponentHand;
