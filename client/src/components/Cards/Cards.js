import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { FiMessageSquare, FiVideo, FiUsers, FiEdit } from "react-icons/fi";

const Cards = () => {
  return (
    <CardsContainer>
      <Wrapper>
        <Card link="/movies">
          <FiVideo size={42} />
          <span>Movies</span>
        </Card>
        <Card link="/friends">
          <FiUsers size={42} />
          <span>Friends</span>
        </Card>
        <Card link="/chat">
          <FiMessageSquare size={42} />
          <span>Convos</span>
        </Card>
        <Card link="/create-avatar">
          <FiEdit size={42} />
          <span>Avatar</span>
        </Card>
      </Wrapper>
    </CardsContainer>
  );
};

const CardsContainer = styled.div`
  width: 70%;
  margin-top: 20px;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 12px;
  }
`;

const Wrapper = styled.div`
  padding: 8px;
  display: grid;
  height: 100%;
  gap: 30px 30px;
  justify-content: center;
  grid-template-columns: repeat(2, 350px);
  grid-template-rows: repeat(2, 120px);
`;

export default Cards;
