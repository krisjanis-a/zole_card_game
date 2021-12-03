import React from "react";
import "./Button.scss"

const Button = ({ buttonName, type }) => {
  return (
    <div className={`button-${type}`}>
      <button>{buttonName}</button>
    </div>
  );
};

export default Button;
