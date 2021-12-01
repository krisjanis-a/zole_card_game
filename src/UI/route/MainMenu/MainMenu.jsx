import React from "react";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";

const MainMenu = () => {
  return (
    <div className="mainMenu">
      <Link to="./session">
        <Button buttonName="Start Session" />
      </Link>
      <Link to="./settings">
        <Button buttonName="Settings" />
      </Link>
      <Button buttonName="Exit Game" />
    </div>
  );
};

export default MainMenu;
