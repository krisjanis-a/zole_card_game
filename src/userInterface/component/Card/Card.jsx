import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cardIdToCard from "../../../engine/utils/cardIdToCard";
import { addCardToBigStack } from "../../store/BigStack/BigStack.action";
import { nextMoveTurn, setAskingCard } from "../../store/Move/Move.action";
import { addMoveCard } from "../../store/MoveCards/MoveCards.action";
import { removeCardFromHand } from "../../store/Players/Players.action";
import { nextSeat } from "../../store/Round/Round.actions";
import "./Card.scss";

const Card = ({ cardId, path, owner = "none", stackIndex = "" }) => {
  const dispatch = useDispatch();
  const moveCards = useSelector((state) => state.MoveCards);
  const {
    choosingBigPhase,
    buryingCardsPhase,
    makingMovesPhase,
    resultsPhase,
    currentPhase,
  } = useSelector((state) => state.RoundPhase);

  const { askingCard, moveTurn } = useSelector((state) => state.Move);
  const { currentSeat } = useSelector((state) => state.Round);

  const card = cardIdToCard(cardId);

  const [active, setActive] = useState(false);
  const [nonPlayable, setNonPlayable] = useState(true);

  useEffect(() => {
    if (owner.isComputer === false) {
      setNonPlayable(false);
    }
  }, []);

  // Determine whether card should be active / inactive
  useEffect(() => {
    switch (currentPhase) {
      case "CHOOSING_BIG": {
        setActive(false);
        return;
      }
      case "BURYING_CARDS": {
        if (owner.isComputer) {
          setActive(false);
          return;
        }

        owner.seatNumber === currentSeat && setActive(true);
        owner.seatNumber !== currentSeat && setActive(false);
        return;
      }

      case "MAKING_MOVES": {
        if (owner === "moveCards" || owner === "stack" || owner.isComputer) {
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
  }, [currentPhase, currentSeat, askingCard]);

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
      addCardToMoveCard();
      dispatch(nextSeat());
      dispatch(nextMoveTurn());
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

  const addCardToMoveCard = () => {
    if (moveCards.every((moveCard) => moveCard.id !== cardId)) {
      if (moveTurn === 1) {
        dispatch(setAskingCard(card));
      }
      dispatch(addMoveCard(card, owner));
      dispatch(removeCardFromHand(owner.name, cardId));
    }
  };

  const buryCard = () => {
    dispatch(addCardToBigStack(card));
    dispatch(removeCardFromHand(owner.name, cardId));
  };

  return (
    <div
      key={cardId}
      className={`card cardId${cardId} ${
        owner === "moveCards" ? "moveCard" : ""
      } ${owner === "stack" ? "stack" : ""}
      ${stackIndex} ${active ? "active" : "inactive"} ${
        nonPlayable ? "nonPlayable" : ""
      }`}
      onClick={() => handleClick()}
    >
      <img src={path} alt="" />
    </div>
  );
};

export default Card;
