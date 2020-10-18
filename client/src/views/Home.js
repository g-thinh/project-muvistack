import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signout, signin } from "../helpers/auth";
import Profile from "./Profile";
import { AuthContext } from "../components/AuthContext";
import { Logo, LogoName } from "../assets";
import { THEMES } from "../components/THEMES";
import Button from "../components/UI/Button";
import Footer from "../components/Footer";

const Home = () => {
  const { appUser, authenticated } = React.useContext(AuthContext);

  const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${authenticated ? THEMES.white : THEMES.BlackCoffee};
  `;

  return (
    <PageContainer>
      {authenticated ? (
        <>
        <Profile />
        <Footer />
        </>
      ) : (
        <>
          <LogoImg src={Logo} alt="logo-no-bg" />
          <Title src={LogoName} alt="logo-name" />
          <Button redirect="/signup" size="md" type="fill">
            Sign Up
          </Button>
          <br></br>
          <Button redirect="/login" size="md" type="outline">
            Login
          </Button>
        </>
      )}

    </PageContainer>
  );
};

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
    transform: scale(1.1);
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
    transform: scale(1.1);
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
