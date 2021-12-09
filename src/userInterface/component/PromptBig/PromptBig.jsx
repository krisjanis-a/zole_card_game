import React, { useEffect } from "react";
import "./PromptBig.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";

const PromptBig = () => {
  const dispatch = useDispatch();

  const { chooseBigTurn } = useSelector((state) => state.Game);
  const { currentSeat } = useSelector((state) => state.Game);
  console.log(chooseBigTurn);

  const { playerName } = useSelector((state) => state.Players);
  console.log(playerName);

  const chooseBigTurnUpdate = () => {
    dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: chooseBigTurn + 1 });
  };

  return (
    <div className="chooseBigPrompt">
      <h4>{`Turn ${currentSeat}`}</h4>
      <Button buttonName="Zole" type="secondary" />
      <Button buttonName="Pick Table" type="secondary" />
      <Button
        buttonName="Pass"
        type="secondary"
        onClick={chooseBigTurnUpdate}
      />
    </div>
  );
};

export default PromptBig;
