import React from "react";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";

const MainMenu = () => {
  return (
    <div className="mainMenu">
      {/* <Link to="/session"> */}
      <Button buttonName="Start Session" />
      {/* </Link> */}
      {/* <Link> */}
      <Button buttonName="Settings" />
      {/* </Link> */}
      {/* <Link> */}
      <Button buttonName="Exit Game" />
      {/* </Link> */}
    </div>
  );
};

export default MainMenu;
