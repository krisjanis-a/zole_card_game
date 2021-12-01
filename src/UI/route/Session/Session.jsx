import React from "react";
import GameScreen from "../../component/GameScreen/GameScreen";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";

const Session = () => {
  return (
    <div className="session">
      <Link to="/">
        <Button buttonName="Return to Menu" />
      </Link>
      <GameScreen />
    </div>
  );
};

export default Session;
