import React, { useEffect, useState } from "react";
import "./PromptBig.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import {
  addTableToPlayerHand,
  setBig,
} from "../../store/Players/Players.action";

const PromptBig = ({ setShowChooseBigPrompt }) => {
  const dispatch = useDispatch();

  const { startingSeat } = useSelector((state) => state.Session);

  const { normalMode, tableMode, smallZoleMode } = useSelector(
    (state) => state.SessionMode
  );
  const table = useSelector((state) => state.Table);
  const players = useSelector((state) => state.Players);

  const { currentSeat, chooseBigTurn, allPlayersPassed } = useSelector(
    (state) => state.Round
  );

  const [player, setPlayer] = useState();

  const playerObj = Object.values(players).filter(
    (player) => player.seatNumber === currentSeat
  );

  // Set player
  useEffect(() => {
    setPlayer(...playerObj);
  }, [playerObj]);

  // Set game mode

  // PLAY ZOLE
  const handlePlayZole = () => {
    dispatch(setBig(player.name, true));
    // dispatch({ type: "SET_BIG", payload: { name: player.name, big: true } });
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
    dispatch({ type: "SET_CURRENT_SEAT", payload: startingSeat });
  };

  // PICK TABLE
  const handlePickTable = () => {
    dispatch(setBig(player.name, true));
    // dispatch({ type: "SET_BIG", payload: { name: player.name, big: true } });
    // dispatch({
    //   type: "ADD_TABLE_TO_PLAYER_HAND",
    //   payload: {
    //     name: player.name,
    //     table: table,
    //   },
    // });
    dispatch(addTableToPlayerHand(player.name, table));
    dispatch({ type: "CLEAR_TABLE" });

    setShowChooseBigPrompt(false);
    dispatch({ type: "SET_CHOOSING_BIG_PHASE", payload: false });
    dispatch({ type: "SET_BURYING_PHASE", payload: true });
  };

  // PLAY SMALL ZOLE
  const handlePlaySmallZole = () => {
    dispatch(setBig(player.name, true));
    // dispatch({ type: "SET_BIG", payload: { name: player.name, big: true } });
    dispatch({ type: "SET_PLAY_SMALL_ZOLE", payload: true });

    setShowChooseBigPrompt(false);
    dispatch({ type: "SET_CHOOSING_BIG_PHASE", payload: false });
    dispatch({ type: "SET_MAKING_MOVES_PHASE", payload: true });
    dispatch({ type: "SET_CURRENT_SEAT", payload: startingSeat });
  };

  // PASS
  const chooseBigTurnUpdate = () => {
    if (chooseBigTurn < 4) {
      dispatch({ type: "SET_CHOOSE_BIG_TURN", payload: chooseBigTurn + 1 });
    }
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
