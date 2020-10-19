import React from "react";
import styled from "styled-components";
import { AuthContext } from "../components/AuthContext";
import { Logo, LogoName } from "../assets";
import { THEMES } from "../components/THEMES";
import Button from "../components/UI/Button";
import Footer from "../components/Footer";

const Start = () => {
  const {authenticated } = React.useContext(AuthContext);

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
      <LogoImg src={Logo} alt="logo-no-bg" />
      <Title src={LogoName} alt="logo-name" />
      <Button redirect="/signup" size="md" type="fill">
        Sign Up
      </Button>
      <br></br>
      <Button redirect="/login" size="md" type="outline">
        Login
      </Button>
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

export default Start;
