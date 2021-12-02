import React from "react";
import "./Card.css";

const Card = ({ cardId, path }) => {
  return (
    <div key={cardId} className={"card cardId" + cardId}>
      <img src={path} alt="" />
    </div>
  );
};

export default Card;
