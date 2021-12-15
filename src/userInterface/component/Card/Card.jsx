import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cardIdToCard from "../../../engine/Utils/cardIdToCard";
import "./Card.scss";

const Card = ({ cardId, path, owner = "none" }) => {
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
    moveTurn,
  } = useSelector((state) => state.Game);

  const card = cardIdToCard(cardId);

  const [active, setActive] = useState(false);

  // Determine whether card should be active / inactive
  useEffect(() => {
    switch (currentPhase) {
      case "CHOOSING_BIG": {
        setActive(false);
        return;
      }
      case "BURYING_CARDS": {
        owner.seatNumber === currentSeat && setActive(true);
        owner.seatNumber !== currentSeat && setActive(false);
        return;
      }

      case "MAKING_MOVES": {
        if (owner === "moveCards" || owner === "stack") {
          setActive(false);
          return;
        }
        owner.seatNumber !== currentSeat && setActive(false);

        const cardValid = checkIfCardValid();
        owner.seatNumber === currentSeat && cardValid && setActive(true);
        return;
      }

      case "RESULTS": {
        setActive(false);
        return;
      }
    }
  }, [currentPhase, currentSeat]);

  // Another version for above switch statement (older && unfinished && not as good)
  /* useEffect(() => {
    if (choosingBigPhase) setActive(false);
    if (buryingCardsPhase && owner.seatNumber === currentSeat) {
      setActive(true);
    }

    if (makingMovesPhase && owner.seatNumber === currentSeat) {
    }

    if (resultsPhase) setActive(false);
  }, [choosingBigPhase, buryingCardsPhase, makingMovesPhase, resultsPhase]); */

  const handleClick = () => {
    if (buryingCardsPhase && active) {
      buryCard();
    }

    if (makingMovesPhase && active) {
      addMoveCard();
      dispatch({ type: "NEXT_SEAT" });
      dispatch({ type: "NEXT_MOVE_TURN" });
    }
  };

  const checkIfCardValid = () => {
    let cardValid = false;

    if (!askingCard) return (cardValid = true);

    if (askingCard.isTrump && card.isTrump) {
      cardValid = true;
    }

    if (
      !askingCard.isTrump &&
      !card.isTrump &&
      card.suite === askingCard.suite
    ) {
      cardValid = true;
    }

    if (
      askingCard.isTrump &&
      owner.hand.filter((card) => card.isTrump).length === 0
    ) {
      cardValid = true;
    }

    if (
      !askingCard.isTrump &&
      owner.hand.filter(
        (card) => !card.isTrump && card.suite === askingCard.suite
      ).length === 0
    ) {
      cardValid = true;
    }

    return cardValid;
  };

  const addMoveCard = () => {
    if (moveCards.every((moveCard) => moveCard.id !== cardId)) {
      if (moveTurn === 1) {
        dispatch({ type: "SET_ASKING_CARD", payload: card });
      }
      dispatch({
        type: "ADD_MOVE_CARD",
        payload: { card: card, owner: owner },
      });
      dispatch({
        type: "REMOVE_CARD_FROM_HAND",
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
      className={`card cardId${cardId} ${active ? "active" : "inactive"} ${
        owner === "moveCards" ? "moveCard" : ""
      } ${owner === "stack" ? "stack" : ""}`}
      onClick={() => handleClick()}
    >
      <img src={path} alt="" />
    </div>
  );
};

export default Card;
