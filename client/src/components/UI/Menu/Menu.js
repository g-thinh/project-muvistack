import React from 'react';
import styled from "styled-components";
import { bool, func } from 'prop-types';
import {THEMES} from "../../THEMES";
import Backdrop from "../Backdrop";

const Menu = ({ open, setOpen }) => {
  return (
    <>
    <Backdrop show={open} closeHandler={() => setOpen(!open)} /> 
    <StyledMenu open={open}>
      <a href="/">
        <span role="img" aria-label="Profile">&#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;</span>
        Profile
      </a>
      <a href="/">
        <span role="img" aria-label="Messages">&#x1f4b8;</span>
        Messages
        </a>
      <a href="/">
        <span role="img" aria-label="Log Out">&#x1f4e9;</span>
        Log Out
        </a>
    </StyledMenu>
    </>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${THEMES.Cart};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  position: fixed;
  z-index: 9;
  /* transform: translateX(-100%); */
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  
  /* @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  } */

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    /* color: ${({ theme }) => theme.primaryDark}; */
    text-decoration: none;
    transition: color 0.3s linear;
    
    /* @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    } */
  }
`;
export default Menu;