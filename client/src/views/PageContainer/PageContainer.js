import React from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";

const PageContainer = ({ children }) => {


  return (
    <>
    <Container>
      {children}
    </Container>
    <Footer height={15}/>
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
  min-height: 100vh;
`;
export default PageContainer;
