import React from "react";
import GameScreen from "../../component/GameScreen/GameScreen";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";
import { useDispatch } from "react-redux";

const Session = () => {
  const dispatch = useDispatch();

  const endSession = () => {
    dispatch({ type: "END_SESSION" });
  };

  return (
    <div className="session">
      <GameScreen />
      <Link to="/">
        <Button buttonName="Return to Menu" type="main" onClick={endSession} />
      </Link>
    </div>
  );
};

export default Session;
