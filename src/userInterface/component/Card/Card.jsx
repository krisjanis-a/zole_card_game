import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cardIdToCard from "../../../engine/Utils/cardIdToCard";
import "./Card.scss";

const Card = ({ cardId, path, owner }) => {
  const dispatch = useDispatch();
  const moveCards = useSelector((state) => state.MoveCards);
  const {
    choosingBigPhase,
    buryingCardsPhase,
    makingMovesPhase,
    resultsPhase,
    currentSeat,
    askingCard,
    currentPhase,
  } = useSelector((state) => state.Game);

  const card = cardIdToCard(cardId);

  const [active, setActive] = useState(false);

  // Determine whether card should be active / inactive
  useEffect(() => {
    if (choosingBigPhase) setActive(false);
    if (buryingCardsPhase && owner.seatNumber === currentSeat) {
      setActive(true);
    }

    if (makingMovesPhase) {
    }

    if (resultsPhase) setActive(false);
  }, [choosingBigPhase, buryingCardsPhase, makingMovesPhase, resultsPhase]);

  const handleClick = () => {
    if (buryingCardsPhase && active) {
      buryCard();
    }

    if (makingMovesPhase) {
      addMoveCard();
    }
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
        payload: { name: owner.name, cardId: cardId },
      });
    }
  };
  const buryCard = () => {
    dispatch({
      type: "ADD_CARD_TO_BIG_STACK",
      payload: card,
    });
    dispatch({
      type: "REMOVE_CARD_FROM_HAND",
      payload: { name: owner.name, cardId: cardId },
    });
  };

  return (
    <div
      key={cardId}
      className={`card cardId${cardId} ${active ? "active" : "inactive"}`}
      onClick={() => handleClick()}
    >
      <img src={path} alt="" />
    </div>
  );
};

export default Card;
