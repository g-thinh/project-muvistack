import React from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import { THEMES } from "../../components/THEMES";

const PageContainer = ({ children, background }) => {
  let bg;
  switch (background) {
    case "dark": {
      bg = THEMES.BlackCoffee;
      break;
    }
    case "light": {
      bg = THEMES.White;
      break;
    }
    default: {
      bg = THEMES.White;
    }
  }

  return (
    <>
      <Container bg={bg}>{children}</Container>
      <Footer height={15} />
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* border: 5px solid red; */
  /* min-height: 100vh; */
  background-color: ${(props) => props.bg};
`;

export default PageContainer;
