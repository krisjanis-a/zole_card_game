import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./PromptBury.scss";

const PromptBury = () => {
  const players = useSelector((state) => state.Players);
  const { chooseBigTurn } = useSelector((state) => state.Game);

  const player = Object.values(players).filter(
    (player) => player.seatNumber === chooseBigTurn
  )[0];

  return (
    <div className="promptBuryCards">
      <h3>{`Bury two cards, ${player.name}`}</h3>
    </div>
  );
};

export default PromptBury;
