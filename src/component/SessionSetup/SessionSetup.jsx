import React from "react";
import "./SessionSetup.scss";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import { initializeSession } from "../../store/Session/Session.action";
import {
  setNormalMode,
  setTableMode,
  setSmallZoleMode,
} from "../../store/SessionMode/SessionMode.action";

const SessionSetup = () => {
  const dispatch = useDispatch();

  const { normalMode, tableMode, smallZoleMode } = useSelector(
    (state) => state.SessionMode
  );

  const toggleNormalMode = () => {
    if (!normalMode) {
      dispatch(setNormalMode(true));
      dispatch(setTableMode(false));
    }
  };

  const toggleTableMode = () => {
    if (!tableMode) {
      dispatch(setNormalMode(false));
      dispatch(setTableMode(true));
    }
  };

  const toggleSmallZoleMode = () => {
    dispatch(setSmallZoleMode(!smallZoleMode));
  };

  const handleLaunchSession = () => {
    dispatch(initializeSession());
  };

  const cancelSetup = () => {
    dispatch(setNormalMode(true));
    dispatch(setTableMode(false));
    dispatch(setSmallZoleMode(false));
  };

  return (
    <div className="sessionSetup">
      <div className="modeOptions">
        <div className="modeOption">
          <label htmlFor="NormalMode">Normal - </label>
          <input
            id="NormalMode"
            type="checkbox"
            name="NormalMode"
            value="Normal"
            checked={normalMode}
            onChange={toggleNormalMode}
          />
        </div>

        <div className="modeOption">
          <label htmlFor="TableMode">Table - </label>
          <input
            id="TableMode"
            type="checkbox"
            name="TableMode"
            value="Table"
            checked={tableMode}
            onChange={toggleTableMode}
          />
        </div>

        <div className="modeOption">
          <label htmlFor="SmallZoleMode">Small Zole - </label>
          <input
            id="SmallZoleMode"
            type="checkbox"
            name="SmallZoleMode"
            value="SmallZole"
            checked={smallZoleMode}
            onChange={toggleSmallZoleMode}
          />
        </div>
      </div>

      <Button
        buttonName={"Launch session"}
        type="main"
        onClick={handleLaunchSession}
      />
      <Link to="/">
        <Button buttonName={"Cancel"} type="secondary" onClick={cancelSetup} />
      </Link>
    </div>
  );
};

export default SessionSetup;
