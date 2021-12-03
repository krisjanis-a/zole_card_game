import React from "react";
import PlayerHand from "../PlayerHand/PlayerHand";
import OpponentHand from "../OpponentHand/OpponentHand";

const GameScreen = () => {
  return (
    <div>
      <h2>Player</h2>
      <PlayerHand playerHand={[1, 2, 6, 7]} />
      <h2>Computer 1</h2>
      <OpponentHand opponentHand={[21, 5, 3, 17]} />
      <h2>Computer 2</h2>
      <OpponentHand opponentHand={[21, 5, 3, 17]} />
    </div>
  );
};

export default GameScreen;
