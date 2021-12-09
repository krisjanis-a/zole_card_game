import React from "react";
import "./PromptBig.scss";
import { useSelector } from "react-redux";
import Button from "../Button/Button";

const PromptBig = () => {
  // const {}
  const { chooseBigTurn } = useSelector((state) => state.Game);
  const { currentSeat } = useSelector((state) => state.Game);
  console.log(chooseBigTurn);

  return (
    <div className="chooseBigPrompt">
      <h4>{}</h4>
      <Button buttonName="Zole" type="secondary" />
      <Button buttonName="Pick Table" type="secondary" />
      <Button buttonName="Pass" type="secondary" />
    </div>
  );
};

export default PromptBig;
