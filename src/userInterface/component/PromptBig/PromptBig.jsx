import React, { useEffect, useState } from "react";
import "./PromptBig.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";

const PromptBig = ({ setShowChooseBigPrompt }) => {
  const dispatch = useDispatch();

  const { startingSeat } = useSelector((state) => state.Session);

  const { normalMode, tableMode, smallZoleMode } = useSelector(
    (state) => state.SessionMode
  );
  const table = useSelector((state) => state.Table);
  const players = useSelector((state) => state.Players);

  const { chooseBigTurn } = useSelector((state) => state.Round);

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
          dispatch({ type: "ADD_COLLECTIVE_DUE" });
          resetRound();
        }

        if (tableMode) {
          dispatch({ type: "SET_PLAY_TABLE", payload: true });
        }
      }, 1500);
    }
  }, [chooseBigTurn]);

  // Reset round
  const resetRound = () => {
    // Reset round running/finished, move count, current seat, choose big turn, big one wins small zole parameters
    dispatch({ type: "SET_ROUND_RUNNING", payload: false });
    dispatch({ type: "SET_ROUND_FINISHED", payload: false });
    dispatch({ type: "RESET_MOVE_COUNT" });
    dispatch({
      type: "SET_CURRENT_SEAT_TO_STARTING_SEAT",
      payload: startingSeat,
    });
    dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: null });
    dispatch({ type: "SET_BIG_WINS_SMALL_ZOLE", payload: false });

    // Reset round phase, result & type
    dispatch({ type: "RESET_ROUND_PHASE" });
    dispatch({ type: "RESET_ROUND_RESULT" });
    dispatch({ type: "RESET_ROUND_TYPE" });
    dispatch({ type: "RESET_MOVE" });
    dispatch({ type: "RESET_MOVE_CARDS" });

    // Reset table, stacks & tricks
    dispatch({ type: "CLEAR_TABLE" });
    dispatch({ type: "RESET_BIG_STACK" });
    dispatch({ type: "RESET_SMALL_STACK" });
    dispatch({ type: "RESET_TABLE_STACK" });
    dispatch({ type: "RESET_TRICK_COUNTS" });

    // Reset player's big one parameter
    Object.values(players).forEach((player) => {
      dispatch({ type: "SET_BIG", payload: { name: player.name, big: false } });
    });

    // Initialize new round
    dispatch({ type: "INITIALIZE_ROUND", payload: true });
  };

  // Set player
  useEffect(() => {
    setPlayer(...playerObj);
  }, [playerObj]);

  // Set game mode

  // PLAY ZOLE
  const handlePlayZole = () => {
    dispatch({ type: "SET_BIG", payload: { name: player.name, big: true } });
    dispatch({
      type: "SET_PLAY_ZOLE",
      payload: true,
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

    setShowChooseBigPrompt(false);
    dispatch({ type: "SET_CHOOSING_BIG_PHASE", payload: false });
    dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: true });
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
