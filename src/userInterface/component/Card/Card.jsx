import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Card.scss";

const Card = ({ cardId, path, owner }) => {
  const dispatch = useDispatch();
  const moveCards = useSelector((state) => state.MoveCards);
  const {
    choosingBigPhase,
    buryingCardsPhase,
    makingMovesPhase,
    resultsPhase,
  } = useSelector((state) => state.Game);

  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (choosingBigPhase) setActive(false);
    // if (buryingCardsPhase )
    // console.log(moveCards);
    // Check if correct card selected if is not asking card
    // If valid selection add to move card and remove from player's hand
  };

  const checkIfCardValid = () => {};

  const addMoveCard = () => {
    if (moveCards.every((moveCardsID) => moveCardsID !== cardId)) {
      dispatch({ type: "ADD_MOVE_CARD", payload: cardId });
      dispatch({
        type: "REMOVE_USER_CARD",
        payload: { name: owner, cardId: cardId },
      });
    }
  };
  const buryCard = () => {};

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
