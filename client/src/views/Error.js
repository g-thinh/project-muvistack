import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";

const Error = () => {
  return (
    <Container>
      <h1>Sorry, page not found</h1>
    </Container>
  );
};

const Container = styled.div`
  /* border: 2px solid red; */
  /* height: 100vh; */
  width: 100%;
  height: 100vh;
  margin-top: 50px;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 12px;
  }

  & h1 {
    font-size: 44px;
    text-align: center;
  }
`;


export default Error;