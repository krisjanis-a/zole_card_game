import React, { useEffect, useState } from "react";
import "./PromptBig.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";

const PromptBig = ({ setShowChooseBigPrompt }) => {
  const dispatch = useDispatch();

  const { chooseBigTurn, normalMode, tableMode, smallZoleMode } = useSelector(
    (state) => state.Game
  );
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
        dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: true });

        if (normalMode) {
          resetGame();
        }

        if (tableMode) {
          dispatch({ type: "SET_PLAY_TABLE", payload: true });
        }
      }, 1500);
    }
  }, [chooseBigTurn]);

  // Reset game
  const resetGame = () => {
    dispatch({ type: "CLEAR_TABLE" });
    dispatch({ type: "RESET_MOVE_CARDS" });
    dispatch({ type: "RESET_GAME" });
    Object.values(players).forEach((player) => {
      dispatch({ type: "SET_BIG", payload: { name: player.name, big: false } });
    });
  };

  // Set game mode

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
      payload: table,
    });
    dispatch({ type: "CLEAR_TABLE" });

    setShowChooseBigPrompt(false);
    dispatch({ type: "SET_CHOOSING_BIG_PHASE", payload: false });
    dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: true });
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

  // PLAY SMALL ZOLE
  const handlePlaySmallZole = () => {
    dispatch({ type: "SET_BIG", payload: { name: player.name, big: true } });
    dispatch({ type: "SET_PLAY_SMALL_ZOLE", payload: true });
  };

  // PASS
  const chooseBigTurnUpdate = () => {
    dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: chooseBigTurn + 1 });
    dispatch({ type: "NEXT_SEAT" });
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
          {smallZoleMode ? (
            <Button
              buttonName="Small Zole"
              type="secondary"
              onClick={handlePlaySmallZole}
            />
          ) : null}
          <Button
            buttonName="Pass"
            type="secondary"
            onClick={chooseBigTurnUpdate}
          />
        </>
      ) : null}
      {allPlayersPassed && normalMode ? (
        <div>
          <h3>All players passed</h3>
          <h4>Collective due will be added</h4>
        </div>
      ) : null}
      {allPlayersPassed && tableMode ? (
        <div>
          <h3>All players passed</h3>
          <h4>Playing the table</h4>
        </div>
      ) : null}
    </div>
  );
};

export default PromptBig;
