import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCurrentSeatToStartingSeat } from "../../store/Round/Round.actions";
import {
  setBuryingPhase,
  setMakingMovesPhase,
} from "../../store/RoundPhase/RoundPhase.action";
import "./PromptBury.scss";

const PromptBury = ({ setShowBuryCardsPrompt }) => {
  const dispatch = useDispatch();

  const activePlayer = useSelector((state) => state.ActivePlayer);
  const { startingSeat } = useSelector((state) => state.Session);
  const { currentSeat } = useSelector((state) => state.Round);
  const { buryingCardsPhase } = useSelector((state) => state.RoundPhase);

  const playerName = useSelector(
    (state) =>
      Object.values(state.Players).filter(
        (player) => player.seatNumber === currentSeat
      )[0].name
  );

  const playerHand = useSelector(
    (state) =>
      Object.values(state.Players).filter(
        (player) => player.seatNumber === currentSeat
      )[0].hand
  );

  useEffect(() => {
    if (playerHand) {
      if (playerHand.length === 8) {
        dispatch(setBuryingPhase(false));
        dispatch(setMakingMovesPhase(true));
        dispatch(setCurrentSeatToStartingSeat(startingSeat));
        setShowBuryCardsPrompt(false);
      }
    }
  }, [playerHand, buryingCardsPhase]);

  return (
    <>
      {!activePlayer.isComputer ? (
        <div className="promptBuryCards">
          <h3>{`Bury ${playerHand.length - 8} card${
            playerHand.length - 8 === 2 ? "s" : ""
          }, ${playerName ? playerName : null}`}</h3>
        </div>
      ) : null}
    </>
  );
};

export default PromptBury;
