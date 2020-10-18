import React from "react";
import styled from "styled-components";
import { signout } from "../../helpers/auth";
import { AuthContext } from "../AuthContext";
import { THEMES } from "../THEMES";
import { Logo, LogoName } from "../../assets";
import {FiMenu} from "react-icons/fi";
import Burger from "../../components/UI/Burger";
import Menu from "../../components/UI/Menu";

const Nav = (props) => {
  const { authenticated } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  return authenticated ? (
    <>
      <NavContainer>
        <img src={Logo} alt="main-logo" />
        <NavList>
          <Burger open={open} setOpen={setOpen}/>
          <Menu open={open} setOpen={setOpen}/>
        </NavList>
      </NavContainer>

      {props.children}
    </>
  ) : (
    props.children
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  /* border: 5px solid red; */
  align-items: center;
  height: 68px;
  padding: 12px;
  /* overflow: hidden; */
  background-color: ${THEMES.BlackCoffee};
  & h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "GraphiqueW01-Regular";
    font-size: 3rem;
    margin-left: 12px;
    user-select: none;
  }

  & img {
    margin-left: 15px;
    width: 35px;
    height: auto;
  }
`;

const NavList = styled.ul`
  display: flex;
  /* border: 2px solid green; */

  & li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    /* border: 1px dashed green; */
  }
`;

const MenuButton = styled.button`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`;

const StyledFiMenu = styled(FiMenu)`
  color: white;
`;

export const StyledBurger = styled.button`
  position: absolute;
  top: 5%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.primaryLight};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`;

export default Nav;
