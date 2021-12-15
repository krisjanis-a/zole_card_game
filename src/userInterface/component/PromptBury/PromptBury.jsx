import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./PromptBury.scss";

const PromptBury = ({ setShowBuryCardsPrompt }) => {
  const dispatch = useDispatch();

  const players = useSelector((state) => state.Players);
  const { chooseBigTurn, buryingCardsPhase } = useSelector(
    (state) => state.Game
  );

  const player = Object.values(players).filter(
    (player) => player.seatNumber === chooseBigTurn
  )[0];

  useEffect(() => {
    if (player.hand.length === 8) {
      dispatch({ type: "SET_BURYING_PHASE", payload: false });
      dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: true });
      dispatch({ type: "SET_CURRENT_SEAT_TO_STARTING_SEAT" });
      setShowBuryCardsPrompt(false);
    }
  }, [player.hand, buryingCardsPhase]);

  return (
    <div className="promptBuryCards">
      <h3>{`Bury two cards, ${player.name}`}</h3>
    </div>
  );
};

export default PromptBury;
