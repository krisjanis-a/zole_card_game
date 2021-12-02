import React from "react";
import PlayerHand from "../PlayerHand/PlayerHand";

const GameScreen = () => {
  return (
    <div>
      <PlayerHand playerHand={[1, 2, 6, 7]} />
    </div>
  );
};

export default GameScreen;
