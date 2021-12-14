import "./PlayerHand.scss";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const PlayerHand = ({ seat }) => {
  const players = useSelector((state) => state.Players);

  const player = Object.values(players).filter(
    (player) => player.seatNumber === seat
  )[0];

  const playerHand = player.hand
    .map((card) => card.id) // Card => id
    .sort((a, b) => a - b) // sort cards according to id
    .map((id) => {
      return player.hand.filter((item) => item.id === id)[0];
    }); // id => Card

  return (
    <div className="playerHand">
      {playerHand
        ? playerHand.map((card) => (
            <Card
              cardId={card.id}
              path={`../../src/assets/CardSet/${card.id}.png`}
              key={card.id}
              owner={player}
            />
          ))
        : null}
    </div>
  );
};

export default PlayerHand;
