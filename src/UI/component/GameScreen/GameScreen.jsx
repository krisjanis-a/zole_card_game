import React, { useEffect, useState } from "react";
import "./GameScreen.scss";
import PlayerHand from "../PlayerHand/PlayerHand";
import OpponentHand from "../OpponentHand/OpponentHand";
import TableHand from "../TableHand/TableHand";

import MoveCards from "../MoveCards/MoveCards";
import Cards from "../../../Engine/Data/Cards";

import createDeck from "../../../Engine/Utils/createDeck";
import dealCards from "../../../Engine/Utils/dealCards";

const GameScreen = () => {
  const [moveCards, setMoveCards] = useState([]);

  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand1, setcomputerHand1] = useState([]);
  const [computerHand2, setcomputerHand2] = useState([]);
  const [table, setTable] = useState([]);

  const deck = createDeck(Cards);
  const hands = dealCards(deck, 3);

  useEffect(() => {
    setPlayerHand(hands[0]);
    setcomputerHand1(hands[1]);
    setcomputerHand2(hands[2]);
    setTable(hands[3]);
  }, []);

  return (
    <div className="gameScreen">
      <PlayerHand playerHand={playerHand} />
      <OpponentHand opponentHand={computerHand1} />
      <OpponentHand opponentHand={computerHand2} />
      <TableHand tableCards={table} />
      <MoveCards moveCards={moveCards} />
    </div>
  );
};

export default GameScreen;
