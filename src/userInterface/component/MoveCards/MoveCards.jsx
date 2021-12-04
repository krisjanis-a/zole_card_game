import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const MoveCards = () => {
  // const moveCards = useSelector((state) => state.MoveCardsReducer.moveCards);
  // console.log("Movecards");
  // console.log(moveCards);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (moveCards.length === 3) {
  //     dispatch(() => ({ type: "RESET_MOVE_CARDS" }));
  //   }
  // }, [moveCards]);

  return <div className="moveCards">None</div>;
};

export default MoveCards;
