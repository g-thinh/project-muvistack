import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signout, signin } from "../helpers/auth";
import { AuthContext } from "../components/AuthContext";
import { Logo, LogoName } from "../assets";
import { THEMES } from "../components/THEMES";
import Button from "../components/UI/Button";

const Home = () => {
  const { appUser, authenticated } = React.useContext(AuthContext);

  return (
    <PageContainer>
      <LogoImg src={Logo} alt="logo-no-bg" />
      <Title src={LogoName} alt="logo-name" />
      {authenticated ? (
        <button onClick={signout} type="button">
          Sign Out
        </button>
      ) : (
        <>
          <LinkButton to="/signup">Sign Up</LinkButton>
          <br></br>
          <LinkButton2 to="/login">Login</LinkButton2>
        </>
      )}

      {authenticated && (
        <div>
          Logged in as: <strong>{appUser.email}</strong>
        </div>
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${THEMES.BlackCoffee};
`;

const LogoImg = styled.img`
  width: 80px;
`;

const Title = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  margin-top: 2vh;
  margin-bottom: 5vh;
`;

const LinkButton = styled(Link)`
  width: 220px;
  height: 2.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${THEMES.Primary};
  color: ${THEMES.White};
  border: 2px solid ${THEMES.Primary};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 20px;

  &:focus {
    border: 2px solid ${THEMES.Secondary};
    background-color: ${THEMES.Secondary};
    color: white;
    transform: scale(1.1);
  }

  &:hover {
    color: white;
    border: 2px solid ${THEMES.Secondary};
    background-color: ${THEMES.Secondary};
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

const LinkButton2 = styled(Link)`
  width: 220px;
  height: 2.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${THEMES.BlackCoffee};
  color: ${THEMES.Primary};
  border: 2px solid ${THEMES.Primary};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 20px;

  &:focus {
    /* border: 2px solid ${THEMES.Secondary};
    background-color: ${THEMES.Secondary}; */
    /* color: white; */
    transform: scale(1.1);
  }

  &:hover {
    color: ${THEMES.Secondary};
    border: 2px solid ${THEMES.Secondary};
    /* background-color: ${THEMES.Secondary}; */
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

export default Home;
