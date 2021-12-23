import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./PromptBury.scss";

const PromptBury = ({ setShowBuryCardsPrompt }) => {
  const dispatch = useDispatch();

  const { chooseBigTurn } = useSelector((state) => state.Round);

  const { buryingCardsPhase } = useSelector((state) => state.RoundPhase);

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
      <h3>{`Bury ${playerHand.length - 8} card${
        playerHand.length - 8 === 2 ? "s" : ""
      }, ${playerName ? playerName : null}`}</h3>
    </div>
  );
};

export default PromptBury;
