import React from "react";
import styled from "styled-components";
import { THEMES } from "../THEMES";
import { FiCheck, FiStar, FiX } from "react-icons/fi";
import { AuthContext } from "../AuthContext";
import Spinner from "../UI/Spinner";
import { db } from "../../services/firebase";
import { object } from "prop-types";

const moment = require("moment");

const Deck = (props) => {
  const USER = props.user;
  const USER_ID = props.user.uid;
  const CATEGORY = props.category;
  const MOVIES = props.data;
  const removeMovie = props.deleteMovie;
  const imgBaseURL = "https://image.tmdb.org/t/p/original";

  const [match, setMatch] = React.useState(false);

  function addMovie(name, id) {
    // console.log(`Added movie ${name}`);
    db.ref(`users/${USER_ID}`).child(`LikedMovies/${CATEGORY}`).push(id);
    db.ref(`matches/${id}`).child("users").push(USER.email);
    db.ref(`matches/${id}`).update({ title: name });
    updateMatches(id, USER.email);
    removeMovie(id);
  }

  // This function will listen when movie is liked in the match pool
  function updateMatches(movieID, user) {
    db.ref(`matches/${movieID}/users`).on("value", (snapshot) => {
      console.log(`Movie: ${movieID} was liked by ${user}`);
      // do stuff when a new user likes a movie;
      const data = Object.values(snapshot.val());
      console.log("Data is now:", data);

      // Check if there is at least 2 people and the person included is the
      // User
      if (data.length > 1 && data.includes(user)) {
        // do stuff when users match
        console.log("USERS HAVE MATCHED!");
        db.ref(`chats/${movieID}`).update({
          chatCreated: moment().format(),
          users: data,
        });
        setMatch(true);
      }
    });
  }

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // getStuff();
  }, []);

  return (
    <DeckContainer>
      {match ? <h1>You just Matched!</h1> : <h1>No Matches</h1>}
      {MOVIES.map((movie, index) => {
        return (
          <MovieCard index={index} key={movie.id}>
            <Header>
              <Poster src={imgBaseURL + movie.poster_path} alt={movie.id} />
              {/* <Description>{movie.overview}</Description> */}
            </Header>
            {/* <h1>
              Index: {index}, ID: {movie.id}
            </h1> */}
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
  position: relative;
  display: flex;
  flex-flow: column wrap;
  margin-top: 20px;
  /* flex-flow: column; */
  /* overflow: hidden; */
  /* width: 450px; */
`;

const MovieCard = styled.div`
  flex: 1;
  /* z-index: ${(props) => -props.index}; */
  width: 450px;
  /* height: 850px; */
  background-color: ${THEMES.Primary};
  /* height: 400px; */
  border: 1px solid ${THEMES.BlackCoffee};
  /* display: flex; */
  display: ${(props) => (props.index === 0 ? "flex" : "none")};
  flex-flow: column;
  /* margin: 20px 0; */
  border-radius: 22px;
  padding: 18px;
  justify-content: center;
  /* margin-bottom: -20px; */
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