import React from "react";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";
import "./MainMenu.css";

const MainMenu = () => {
  return (
    <div className="mainMenu">
      <Link to="./session">
        <Button buttonName="Start Session" />
      </Link>
      <Link to="./settings">
        <Button buttonName="Settings" />
      </Link>
    </div>
  );
};

export default MainMenu;
