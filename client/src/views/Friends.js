import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import Footer from "../components/Footer";
import { FiAlertOctagon } from "react-icons/fi";

const Friends = () => {
  return (
    <PageContainer>
      <br></br>
      <Text>This is the Friends Page!</Text>
    </PageContainer>
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
`;

const Text = styled.h1`
  font-size: 32px;
`;

export default Friends;
