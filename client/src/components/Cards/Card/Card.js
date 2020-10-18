import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {THEMES} from "../../THEMES";

const Card = ({children, link}) => {
  return (<Container to={link}>
    {children}
  </Container>);
};

const Container = styled(Link)`
  display: flex;
  background: white;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-radius: 21px;
  border: 1px solid #D0D0D0;
  color: ${THEMES.BlackCoffee};
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.5);
  & span {
    font-size: 2rem;
  }

  &:hover {
    background: ${THEMES.Primary};
    color: white;
    border: 1px solid ${THEMES.Primary}
  }
`;

export default Card;
