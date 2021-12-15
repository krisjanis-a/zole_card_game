import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./PromptBury.scss";

const PromptBury = ({ setShowBuryCardsPrompt }) => {
  const dispatch = useDispatch();

  const { chooseBigTurn, buryingCardsPhase } = useSelector(
    (state) => state.Game
  );

  const playerName = useSelector(
    (state) =>
      Object.values(state.Players).filter(
        (player) => player.seatNumber === chooseBigTurn
      )[0].name
  );

  const playerHand = useSelector(
    (state) =>
      Object.values(state.Players).filter(
        (player) => player.seatNumber === chooseBigTurn
      )[0].hand
  );

  useEffect(() => {
    // Only if choose big turn is set then component looks for a player in players object
    if (playerHand) {
      if (playerHand.length === 8) {
        dispatch({ type: "SET_BURYING_PHASE", payload: false });
        dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: true });
        dispatch({ type: "SET_CURRENT_SEAT_TO_STARTING_SEAT" });
        setShowBuryCardsPrompt(false);
      }
    }
  }, [playerHand, buryingCardsPhase]);

  return (
    <div className="promptBuryCards">
      <h3>{`Bury two cards, ${playerName ? playerName : null}`}</h3>
    </div>
  );
};

export default PromptBury;
