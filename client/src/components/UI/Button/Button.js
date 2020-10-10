import React from "react";
import styled from "styled-components";
import { THEMES } from "../../THEMES";

const Button = ({ children, onClickHandler, disabled, type, size = "md" }) => {
  let width;

  const NO_FILL = THEMES.BlackCoffee;
  const FILL = THEMES.Primary;

  switch (size) {
    case "sm": {
      width = "100px";
      break;
    }
    case "md": {
      width = "150px";
      break;
    }
    case "lg": {
      width = "250px";
      break;
    }
    default: {
      width = "150px";
    }
  }

  return (
    <ButtonWrap
      onClick={onClickHandler}
      disabled={disabled}
      style={{ width: width }}
    >
      <span>{children}</span>
    </ButtonWrap>
  );
};

const ButtonWrap = styled.button`
  /* width: 200px; */
  height: 2.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: white;
  color: ${THEMES.Primary};
  border: 2px solid ${THEMES.Primary};
  outline: none;
  & span {
    font-size: 16px;
    font-weight: 400;
  }

  &:focus {
    border: 2px solid ${THEMES.Primary};
    background-color: ${THEMES.Primary};
    color: white;
  }

  &:hover {
    color: white;
    border: 2px solid ${THEMES.Primary};
    background-color: ${THEMES.Primary};
  }

  &:active {
    transform: scale(1.1);
  }

  &:disabled {
    color: white;
    border: 2px solid gainsboro;
    background-color: gainsboro;
    cursor: default;

    &:active {
      transform: scale(1);
    }
  }
`;

export default Button;
