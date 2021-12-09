import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Card.scss";

const Card = ({ cardId, path, active }) => {
  const dispatch = useDispatch();
  const moveCards = useSelector((state) => state.MoveCards);

  const handleClick = () => {
    console.log(moveCards);
    // Check if correct card selected if is not asking card

    // If valid selection add to move card and remove from player's hand
    if (moveCards.every((moveCardsID) => moveCardsID !== cardId)) {
      dispatch({ type: "ADD_MOVE_CARD", payload: cardId });
      dispatch({ type: "REMOVE_USER_CARD", payload: cardId });
    }
  };

  return (
    <div
      key={cardId}
      className={"card cardId" + cardId}
      onClick={() => handleClick()}
    >
      <img src={path} alt="" />
    </div>
  );
};

export default Card;
