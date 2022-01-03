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
  const { buryingCardsPhase } = useSelector((state) => state.RoundPhase);

  useEffect(() => {
    if (activePlayer.hand) {
      if (activePlayer.hand.length === 8) {
        dispatch(setBuryingPhase(false));
        dispatch(setMakingMovesPhase(true));
        dispatch(setCurrentSeatToStartingSeat(startingSeat));
        setShowBuryCardsPrompt(false);
      }
    }
  }, [activePlayer.hand, buryingCardsPhase]);

  return (
    <>
      {!activePlayer.isComputer ? (
        <div className="promptBuryCards">
          <h3>{`Bury ${activePlayer.hand.length - 8} card${
            activePlayer.hand.length - 8 === 2 ? "s" : ""
          }, ${activePlayer.name ? activePlayer.name : null}`}</h3>
        </div>
      ) : (
        <div className="promptBuryCards">
          <h3>{`${activePlayer.name} burying cards`}</h3>
        </div>
      )}
    </>
  );
};

export default PromptBury;
