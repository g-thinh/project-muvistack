import React from "react";
import styled from "styled-components";
import { THEMES } from "../THEMES";

const Categories = (props) => {
  const genres = props.data;
  const handleClick = props.setTest;
  return (
    <Wrapper>
      {genres.map((genre) => {
        return (
          <Category
            onClick={() => handleClick(genre.id, genre.name)}
            key={genre.id}
          >
            {genre.name}
          </Category>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 15px;
  display: grid;
  height: 100%;
  width: 100%;
  gap: 15px 15px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto, 200px);
  /* border: 5px solid red; */
`;

const Category = styled.button`
  display: flex;
  /* background: white; */
  background: ${THEMES.BlackCoffee};
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-radius: 21px;
  border: 1px solid ${THEMES.BlackCoffee};
  /* color: ${THEMES.BlackCoffee}; */
  color: white;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  font-size: 22px;
  padding: 2rem;

  &:hover {
    background: ${THEMES.Primary};
    color: white;
    border: 1px solid ${THEMES.Primary};
  }
`;

export default Categories;
