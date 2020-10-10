import React from "react";
import styled from "styled-components";
import { signout } from "../../helpers/auth";
import { AuthContext } from "../AuthContext";

const Nav = (props) => {
  const { authenticated } = React.useContext(AuthContext);
  return authenticated ? (
    <>
      <NavContainer>
        <h1>Muvistack</h1>
        <NavList>
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Messages</a>
          </li>
          <button onClick={signout} type="button">
            Sign Out
          </button>
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
  border: 5px solid red;
  height: 65px;

  & h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "GraphiqueW01-Regular";
    font-size: 3rem;
    margin-left: 12px;
    user-select: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  border: 2px solid green;

  & li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    border: 1px dashed green;
  }
`;

export default Nav;
