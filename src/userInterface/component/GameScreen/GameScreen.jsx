import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./GameScreen.scss";

import PlayerHand from "../PlayerHand/PlayerHand";
import OpponentHand from "../OpponentHand/OpponentHand";
import TableHand from "../TableHand/TableHand";
import MoveCards from "../MoveCards/MoveCards";

import Cards from "../../../engine/Data/Cards";
import createDeck from "../../../engine/Utils/createDeck";
import dealCards from "../../../engine/Utils/dealCards";
import { useDispatch } from "react-redux";

const GameScreen = () => {
  const [moveCards, setMoveCards] = useState([]);

  // const moveCardsState = useSelector(
  //   (state) => state.MoveCardsReducer.moveCards
  // );

  const dispatch = useDispatch();

  // console.log(moveCardsState);

  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand1, setcomputerHand1] = useState([]);
  const [computerHand2, setcomputerHand2] = useState([]);
  const [table, setTable] = useState([]);

  const deck = createDeck(Cards);
  const hands = dealCards(deck, 3);

  // const player

  useEffect(() => {
    setPlayerHand(hands[0]);
    setcomputerHand1(hands[1]);
    setcomputerHand2(hands[2]);
    setTable(hands[3]);
  }, []);

  return (
    <div className="gameScreen">
      <PlayerHand playerHand={playerHand} seat={1} />
      <OpponentHand opponentHand={computerHand1} seat={2} />
      <OpponentHand opponentHand={computerHand2} seat={3} />
      <TableHand tableCards={table} />
      <MoveCards moveCards={moveCards} />
      {/* <button onClick={() => dispatch({ type: "ADD_MOVE_CARD", payload: 69 })}>
        Add move card
      </button> */}
    </div>
  );
};

export default GameScreen;
