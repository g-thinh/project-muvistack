import React from "react";
import styled from "styled-components";
import { THEMES } from "../THEMES";

const Snackbar = (props) => {
  const isActive = props.show;

  return isActive && <Bar>{props.children}</Bar>;
};

const Bar = styled.div`
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 0 10px;
  height: 45px;
  border-radius: 22px;
  border: 2px solid ${THEMES.Blue};
  background-color: ${THEMES.Blue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  z-index: 9;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 10%;
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      bottom: 10%;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }
`;

const Button = styled.button`
  margin-top: 10px;
  width: 70%;
  height: 2.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${THEMES.Blue};
  color: white;
  border: 2px solid ${THEMES.Blue};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  & span {
    font-size: 1.3rem;
    font-weight: 400;
  }

  &:focus {
    border: 2px solid ${THEMES.SecondaryBlue};
    background-color: ${THEMES.SecondaryBlue};
    color: white;
    /* transform: scale(1.1); */
  }

  &:hover {
    color: white;
    border: 2px solid ${THEMES.SecondaryBlue};
    background-color: ${THEMES.SecondaryBlue};
    /* transform: scale(1.1); */
  }

  &:active {
    transform: scale(1.1);
  }
`;

export default Snackbar;
