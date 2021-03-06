import React from "react";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";
import "./MainMenu.scss";

const MainMenu = () => {
  return (
    <div className="mainMenu">
      <h1>Welcome to Zole - Card Game</h1>
      <Link to="./session">
        <Button buttonName="Start Session" type="main" />
      </Link>
      <Link to="./settings">
        <Button buttonName="Settings" type="main" />
      </Link>
    </div>
  );
};

export default MainMenu;
