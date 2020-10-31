import React from "react";
import styled from "styled-components";
import { THEMES } from "../THEMES";
import { FiCheck, FiStar, FiX } from "react-icons/fi";
import { AuthContext } from "../AuthContext";
import Spinner from "../UI/Spinner";
import { db } from "../../services/firebase";

const moment = require("moment");

const Deck = (props) => {
  const USER = props.user;
  const CATEGORY = props.category;
  const MOVIES = props.data;
  const removeMovie = props.deleteMovie;
  const imgBaseURL = "https://image.tmdb.org/t/p/original";

  function addMovie(name, id) {
    console.log(`Added movie ${name}`);
    db.ref(`users/${USER}`).child(`LikedMovies/${CATEGORY}`).push(id);
    removeMovie(id);
  }

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <DeckContainer>
      {MOVIES.map((movie, index) => {
        return (
          <MovieCard index={index}>
            <Header>
              <Poster src={imgBaseURL + movie.poster_path} alt={movie.id} />
              {/* <Description>{movie.overview}</Description> */}
            </Header>
            <h1>
              Index: {index}, ID: {movie.id}
            </h1>
            <Title>
              {movie.title},{" "}
              <span>{moment(movie.release_date).format("YYYY")}</span>
            </Title>
            <Action>
              <Button
                onClick={(ev) => {
                  addMovie(movie.title, movie.id);
                }}
              >
                <FiCheck size={32} color="green" />
              </Button>
              {/* <Button>
                <FiStar size={32} color="dodgerblue" />
              </Button> */}
              <Button
                // onClick={(ev) => {
                //   removeMovie(movie.title, movie.id);
                // }}
                onClick={() => removeMovie(movie.id)}
              >
                <FiX size={32} color="red" />
              </Button>
            </Action>
          </MovieCard>
        );
      })}
    </DeckContainer>
  );
};

const DeckContainer = styled.div`
  /* position: relative; */
  display: flex;
  flex-flow: column wrap;
  /* flex-flow: column;

  /* overflow: hidden; */
  border: 5px solid blue;
`;

const MovieCard = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%; */
  flex: 1;
  /* z-index: ${(props) => -props.index}; */
  width: 450px;
  background-color: ${THEMES.Primary};
  /* height: 400px; */
  border: 1px solid ${THEMES.BlackCoffee};
  display: flex;
  flex-flow: column wrap;
  margin: 20px 0;
  border-radius: 22px;
  padding: 18px;
  justify-content: center;
  margin-bottom: -20px;
`;

const Action = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
`;

const Button = styled.button`
  border: 1px solid #d9d9d9d9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  background-color: ${THEMES.White};
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 8px;

  &:hover {
    transform: scale(1.1);
  }
`;

const Header = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 22px;
  border: none;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 500;
  margin: 5px 0;
  & span {
    margin-left: 8px;
    /* font-family: "Raleway"; */
    font-style: italic;
    font-weight: 400;
  }
`;

const Description = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: transparent;
  position: absolute;
  z-index: 50;
  bottom: 0;
  left: 0;
  &:hover {
    background-color: blue;
  }
`;

export default Deck;
