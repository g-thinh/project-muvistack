import React from "react";
import styled from "styled-components";
import Card from "./Card";
import {FiMessageSquare, FiVideo, FiUsers, FiCalendar} from "react-icons/fi";

const Cards = () => {
  return (
    <CardsContainer>
      <Wrapper>
        <Card link="/movies"><FiVideo size={56}/><span>Movies</span></Card>
        <Card link="/friends"><FiUsers size={56}/><span>Friends</span></Card>
        <Card link="/messages"><FiMessageSquare size={56}/><span>Convos</span></Card>
        <Card link="/dates"><FiCalendar size={56}/><span>Dates</span></Card>
      </Wrapper>
    </CardsContainer>

  );
};

const CardsContainer = styled.div`
  /* border: 2px solid red; */
  /* height: 100vh; */
  width: 100%;
  margin-top: 50px;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 12px;
  }
`;

const Wrapper = styled.div`
  padding: 15px;
  display: grid;
  height: 100%;
  gap: 30px 30px;
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: repeat(2,200px);
  /* border: 2px solid green; */

`;



export default Cards;
