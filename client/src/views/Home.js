import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signout, signin } from "../helpers/auth";
import Profile from "./Profile";
import Start from "./Start";
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
      {authenticated ? <Profile/> : <Start/>}
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
export default Home;
