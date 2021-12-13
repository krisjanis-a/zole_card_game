import React, { useEffect, useState } from "react";
import "./PromptBig.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";

const PromptBig = () => {
  const dispatch = useDispatch();

  const { chooseBigTurn } = useSelector((state) => state.Game);
  const players = useSelector((state) => state.Players);

  const [player, setPlayer] = useState({});

  useEffect(() => {
    setPlayer([
      Object.entries(players).filter(
        (player) => player[1].seatNumber === chooseBigTurn
      ),
    ]);
  }, [chooseBigTurn]);

  const chooseBigTurnUpdate = () => {
    dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: chooseBigTurn + 1 });
  };

  return (
    <div className="chooseBigPrompt">
      {/* {player[0] ? (
        <h4>{`${player ? player[0].name : null}, what is your decision?`}</h4>
      ) : null} */}
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
