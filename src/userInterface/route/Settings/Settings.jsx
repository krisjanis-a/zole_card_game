import React from "react";
import { Link } from "react-router-dom";
import Button from "../../component/Button/Button";

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <Link to="/">
        <Button buttonName="Return to Menu" type="main" />
      </Link>
    </div>
  );
};

export default Settings;
