import React from "react";
import "./Button.scss";

const Button = ({ buttonName, type }) => {
  return <button className={`button-${type}`}>{buttonName}</button>;
};

export default Button;
