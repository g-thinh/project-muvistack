import React from 'react';
import styled from "styled-components";
import { bool, func } from 'prop-types';
import {THEMES} from "../../THEMES";
import Backdrop from "../../UI/Backdrop";
import { signout } from "../../../helpers/auth";
import {Link} from "react-router-dom";

const Menu = ({ open, setOpen }) => {

  React.useEffect(()=>{
    return ()=>{
      setOpen(false);
    }
  },[])

  return (
    <>
    <Backdrop show={open} closeHandler={() => setOpen(!open)} /> 
    <StyledMenu open={open}>
      <StyledLink to="/" onClick={() => setOpen(!open)}>
        Profile
      </StyledLink>
      <StyledLink to="/messages" onClick={() => setOpen(!open)}>
        Messages
        </StyledLink>
        <StyledLink to="/settings" onClick={() => setOpen(!open)}>
        Settings
        </StyledLink>
      <StyledButton onClick={signout}>
        Log Out
        </StyledButton>
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
  width: 30vw;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  position: fixed;
  z-index: 9;
  /* width: 30vw; */
  /* transform: translateX(-100%); */
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  
  /* @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  } */
`;

const StyledLink = styled(Link)`
    font-size: 2rem;
    /* text-decoration-color: none; */
    color: ${THEMES.White};
    font-weight: bold;
    /* letter-spacing: 0.5rem; */
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: ${THEMES.BlackCoffee};
    }
`;

const StyledButton = styled.button`
    outline: none;
    border: none;
    background: none;
    font-size: 2rem;
    text-align: start;
    color: ${THEMES.White};
    font-weight: bold;
    /* letter-spacing: 0.5rem; */
    text-decoration: none;
    transition: color 0.3s linear;
    vertical-align: baseline;
    cursor: pointer;
	padding: 4px 0;
    &:hover {
      color: ${THEMES.BlackCoffee};
    }
`;
export default Menu;