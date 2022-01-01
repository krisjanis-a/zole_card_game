import React from "react";
import "./SessionSetup.scss";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeSession } from "../../store/Session/Session.action";

const SessionSetup = () => {
  const dispatch = useDispatch();

  const { normalMode, tableMode, smallZoleMode } = useSelector(
    (state) => state.SessionMode
  );

  const setNormalMode = () => {
    if (!normalMode) {
      dispatch({ type: "SET_NORMAL_MODE", payload: true });
      dispatch({ type: "SET_TABLE_MODE", payload: false });
    }
  };

  const setTableMode = () => {
    if (!tableMode) {
      dispatch({ type: "SET_NORMAL_MODE", payload: false });
      dispatch({ type: "SET_TABLE_MODE", payload: true });
    }
  };

  const setSmallZoleMode = () => {
    dispatch({ type: "SET_SMALL_ZOLE_MODE", payload: !smallZoleMode });
  };

  const handleLaunchSession = () => {
    dispatch(initializeSession());
    // dispatch({ type: "INITIALIZE_SESSION" });
  };

  const cancelSetup = () => {
    dispatch({ type: "SET_NORMAL_MODE", payload: true });
    dispatch({ type: "SET_TABLE_MODE", payload: false });
    dispatch({ type: "SET_SMALL_ZOLE_MODE", payload: false });
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
            onChange={setNormalMode}
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
            onChange={setTableMode}
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
            onChange={setSmallZoleMode}
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
