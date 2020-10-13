import React from "react";
import styled from "styled-components";
import { THEMES } from "../../THEMES";
import { Link } from "react-router-dom";

const Button = ({ children, size, type, redirect }) => {
  let width;
  let height;
  let textColor;
  let borderColor;
  let bgColor;
  let fontSize;

  switch (size) {
    case "sm": {
      width = "120px";
      fontSize = "18px";
      height = "2.3rem";
      break;
    }
    case "md": {
      width = "220px";
      fontSize = "20px";
      height = "2.5rem";
      break;
    }
    case "lg": {
      width = "320px";
      fontSize = "22px";
      height = "3rem";
      break;
    }
  }

  switch (type) {
    case "outline": {
      textColor = THEMES.Primary;
      borderColor = THEMES.Primary;
      bgColor = THEMES.BlackCoffee;
      break;
    }
    case "fill": {
      textColor = THEMES.White;
      borderColor = THEMES.Primary;
      bgColor = THEMES.Primary;
      break;
    }
    default: {
      textColor = THEMES.Primary;
      borderColor = THEMES.Primary;
      bgColor = THEMES.BlackCoffee;
    }
  }

  const StyledLink = styled(Link)`
    width: ${width};
    height: ${height};
    cursor: pointer;
    border-radius: 8px;
    background-color: ${bgColor};
    color: ${textColor};
    border: 2px solid ${borderColor};
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    & span {
      font-size: ${fontSize};
      font-weight: 400;
    }

    &:focus {
      border: 2px solid ${borderColor};
      background-color: ${bgColor};
      color: ${textColor};
      transform: scale(1.1);
    }

    &:hover {
      color: ${textColor};
      border: 2px solid ${borderColor};
      background-color: ${bgColor};
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1.1);
    }
  `;

  return (
    <StyledLink to={redirect}>
      <span>{children}</span>
    </StyledLink>
  );
};

export default Button;
