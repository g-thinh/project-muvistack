import React from "react";
import styled from "styled-components";
import { AuthContext } from "../components/AuthContext";
import { Logo, LogoName, TMDBLogo } from "../assets";
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
      <LogoSection>
        <LogoImg src={Logo} alt="logo-no-bg" />
        <Title src={LogoName} alt="logo-name" />
      </LogoSection>
      <ButtonSection>
      <Button redirect="/signup" size="md" type="fill">
        Sign Up
      </Button>
      <br></br>
      <Button redirect="/login" size="md" type="outline">
        Login
      </Button>
      <br></br>
      </ButtonSection>
      {/* <Button redirect="/signup" size="md" type="fill">
        Sign Up
      </Button>
      <br></br>
      <Button redirect="/login" size="md" type="outline">
        Login
      </Button>
      <br></br> */}
      <FooterContainer>
      <h1>Powered by</h1>
      <img src={TMDBLogo} alt="test" />
      </FooterContainer>

    </PageContainer>
  );
};

const LogoSection = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonSection = styled.div`
  flex: 1;
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

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  flex: 1;
  & h1 {
    color: white;
    line-height: 2;
    font-size: 16px;
    font-weight: 400;
  }

  & img {
    width: 150px;
  }
`;

export default Start;
