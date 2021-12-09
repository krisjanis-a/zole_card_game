import React from "react";
import "./Button.scss";

const Button = ({ buttonName, type, onClick }) => {
  return (
    <button className={`button-${type}`} onClick={onClick}>
      {buttonName}
    </button>
  );
};

export default Button;
