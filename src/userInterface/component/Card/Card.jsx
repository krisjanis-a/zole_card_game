import React from "react";
import { useDispatch } from "react-redux";
import "./Card.scss";

const Card = ({ cardId, path }) => {
  const dispatch = useDispatch();

  return (
    <div
      key={cardId}
      className={"card cardId" + cardId}
      onClick={() => dispatch({ type: "ADD_MOVE_CARD", payload: cardId })}
    >
      <img src={path} alt="" />
    </div>
  );
};

export default Card;
