import React, { useState } from "react";
import GameScreen from "../../component/GameScreen/GameScreen";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";

const Session = () => {
  const { currentMoveCards, setCurrentMoveCards } = useState([]);

  return (
    <div className="session">
      <Link to="/">
        <Button buttonName="Return to Menu" type="main" />
      </Link>
      <GameScreen />
    </div>
  );
};

export default Session;
