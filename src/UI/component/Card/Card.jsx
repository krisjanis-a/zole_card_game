import React from "react";
import "./Card.scss";

const Card = ({ cardId, path }) => {
  return (
    <div key={cardId} className={"card cardId" + cardId}>
      <img src={path} alt="" />
    </div>
  );
};

export default Card;
