import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cardIdToCard from "../../utils/cardIdToCard";
import { addCardToBigStack } from "../../store/BigStack/BigStack.action";
import { nextMoveTurn, setAskingCard } from "../../store/Move/Move.action";
import { addMoveCard } from "../../store/MoveCards/MoveCards.action";
import { removeCardFromHand } from "../../store/Players/Players.action";
import { nextSeat } from "../../store/Round/Round.actions";
import checkIfCardValid from "../../utils/checkIfCardValid";
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

  const { askingCard, moveTurn, moveInProcess } = useSelector(
    (state) => state.Move
  );
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

        if (!moveInProcess) {
          setActive(false);
          return;
        }

        owner.seatNumber !== currentSeat && setActive(false);

        const cardValid = checkIfCardValid(card, askingCard, owner);
        owner.seatNumber === currentSeat && cardValid && setActive(true);
        return;
      }

      case "RESULTS": {
        setActive(false);
        return;
      }
    }
  }, [currentPhase, currentSeat, askingCard, moveInProcess]);

  const handleClick = () => {
    if (buryingCardsPhase && active) {
      buryCard();
    }

    if (makingMovesPhase && active) {
      addCardToMoveCard();
    }
  };

  //TODO This should be turned into a separate function because it is used in computer logic as well (DRY)
  const addCardToMoveCard = () => {
    if (moveCards.every((moveCard) => moveCard.id !== cardId)) {
      if (moveTurn === 1) {
        dispatch(setAskingCard(card));
      }
      dispatch(addMoveCard(card, owner));
      dispatch(removeCardFromHand(owner.name, cardId));

      if (moveTurn < 3) {
        dispatch(nextSeat());
        dispatch(nextMoveTurn());
      }
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
