import React from "react";
import styled from "styled-components";
import { bool, func } from "prop-types";
import { THEMES } from "../../THEMES";
import Backdrop from "../../UI/Backdrop";
import { signout } from "../../../helpers/auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestCurrentUserSignout } from "../../../store/actions";

const Menu = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <>
      <Backdrop show={open} closeHandler={setOpen} />
      <StyledMenu open={open}>
        <StyledLink to="/movies" onClick={() => dispatch(setOpen(false))}>
          Movies
        </StyledLink>
        <StyledLink to="/profile" onClick={() => dispatch(setOpen(false))}>
          Profile
        </StyledLink>
        <StyledLink to="/chat" onClick={() => dispatch(setOpen(false))}>
          Chat
        </StyledLink>
        <StyledLink to="/friends" onClick={() => dispatch(setOpen(false))}>
          Friends
        </StyledLink>
        <StyledLink
          to="/create-avatar"
          onClick={() => dispatch(setOpen(false))}
        >
          My Avatar
        </StyledLink>
        <StyledButton
          onClick={() => {
            dispatch(requestCurrentUserSignout());
            dispatch(setOpen(false));
            signout();
          }}
        >
          Log Out
        </StyledButton>
      </StyledMenu>
    </>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${THEMES.Cart};
  height: 100%;
  width: 45vw;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  position: fixed;
  z-index: 9;

  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};

  @media (max-width: 1000px) {
    width: 65vw;
  }
`;

const StyledLink = styled(Link)`
  font-size: 2rem;
  color: ${THEMES.White};
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s linear;

  &:hover {
    color: ${THEMES.BlackCoffee};
  }

  @media (max-width: 1000px) {
    font-size: 1.8rem;
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
  text-decoration: none;
  transition: color 0.3s linear;
  vertical-align: baseline;
  cursor: pointer;
  padding: 4px 0;
  &:hover {
    color: ${THEMES.BlackCoffee};
  }

  @media (max-width: 1000px) {
    font-size: 1.8rem;
  }
`;
export default Menu;
