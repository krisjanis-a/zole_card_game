import React, { useEffect, useState } from "react";
import "./PromptBig.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";

// Actions
import {
  addTableToPlayerHand,
  setBig,
} from "../../store/Players/Players.action";
import {
  nextSeat,
  setChooseBigTurn,
  setCurrentSeat,
} from "../../store/Round/Round.actions";
import {
  setBuryingPhase,
  setChoosingBigPhase,
  setMakingMovesPhase,
} from "../../store/RoundPhase/RoundPhase.action";
import {
  setPlaySmallZole,
  setPlayZole,
} from "../../store/RoundType/RoundType.action";
import { addTableToSmallStack } from "../../store/SmallStack/SmallStack.action";
import { clearTable } from "../../store/TableCards/Table.action";

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
    dispatch(setPlayZole(true));
    dispatch(addTableToSmallStack(table));
    dispatch(clearTable());

    setShowChooseBigPrompt(false);
    dispatch(setChoosingBigPhase(false));
    dispatch(setMakingMovesPhase(true));
    dispatch(setCurrentSeat(startingSeat));
  };

  // PICK TABLE
  const handlePickTable = () => {
    dispatch(setBig(player.name, true));
    dispatch(addTableToPlayerHand(player.name, table));
    dispatch(clearTable());

    setShowChooseBigPrompt(false);
    dispatch(setChoosingBigPhase(false));
    dispatch(setBuryingPhase(true));
  };

  // PLAY SMALL ZOLE
  const handlePlaySmallZole = () => {
    dispatch(setBig(player.name, true));
    dispatch(setPlaySmallZole(true));

    setShowChooseBigPrompt(false);
    dispatch(setChoosingBigPhase(false));
    dispatch(setMakingMovesPhase(true));
    dispatch(setCurrentSeat(startingSeat));
  };

  // PASS
  const chooseBigTurnUpdate = () => {
    if (chooseBigTurn < 4) {
      dispatch(setChooseBigTurn(chooseBigTurn + 1));
    }
    dispatch(nextSeat());
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
