import React, { useEffect, useState } from "react";
import "./PromptBig.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";

const PromptBig = ({ setShowChooseBigPrompt }) => {
  const dispatch = useDispatch();

  const { chooseBigTurn } = useSelector((state) => state.Game);
  const table = useSelector((state) => state.Table);
  const players = useSelector((state) => state.Players);

  const [player, setPlayer] = useState();
  const [allPlayersPassed, setAllPlayersPassed] = useState(false);

  const playerObj = Object.values(players).filter(
    (player) => player.seatNumber === chooseBigTurn
  );

  // Check if all players have passed
  useEffect(() => {
    if (chooseBigTurn > 3) {
      setAllPlayersPassed(true);
      setTimeout(() => {
        setShowChooseBigPrompt(false);
        dispatch({ type: "SET_CHOOSING_BIG_PHASE", payload: false });
      }, 3000);
    }
  }, [chooseBigTurn]);

  // Set player
  useEffect(() => {
    setPlayer(...playerObj);
  }, [playerObj]);

  // PLAY ZOLE
  const handlePlayZole = () => {
    dispatch({ type: "SET_BIG", payload: { name: player.name, big: true } });
    dispatch({
      type: "SET_PLAY_ZOLE",
      payload: { name: player.name, playZole: true },
    });
    dispatch({
      type: "ADD_TABLE_TO_SMALL_STACK",
      payload: { table: table },
    });
    dispatch({ type: "CLEAR_TABLE" });

    setShowChooseBigPrompt(false);
    dispatch({ type: "SET_CHOOSING_BIG_PHASE", payload: false });
  };

  // PICK TABLE
  const handlePickTable = () => {
    dispatch({ type: "SET_BIG", payload: { name: player.name, big: true } });
    dispatch({
      type: "ADD_TABLE_TO_PLAYER_HAND",
      payload: {
        name: player.name,
        table: table,
      },
    });
    dispatch({ type: "CLEAR_TABLE" });

    setShowChooseBigPrompt(false);
    dispatch({ type: "SET_CHOOSING_BIG_PHASE", payload: false });
    dispatch({ type: "SET_BURYING_PHASE", payload: true });
  };

  // PASS
  const chooseBigTurnUpdate = () => {
    dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: chooseBigTurn + 1 });
  };

  return (
    <div className="chooseBigPrompt">
      {player && !allPlayersPassed ? (
        <>
          <h4>{`${player ? player.name : null}, what is your decision?`}</h4>

          <Button
            buttonName="Play Zole"
            type="secondary"
            onClick={handlePlayZole}
          />
          <Button
            buttonName="Pick Table"
            type="secondary"
            onClick={handlePickTable}
          />
          <Button
            buttonName="Pass"
            type="secondary"
            onClick={chooseBigTurnUpdate}
          />
        </>
      ) : null}
      {allPlayersPassed ? (
        <div>
          <h3>All players passed</h3>
        </div>
      ) : null}
    </div>
  );
};

export default PromptBig;
