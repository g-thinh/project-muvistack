import React from "react";
import styled from "styled-components";
import { THEMES } from "../THEMES";
import { FiCheck, FiStar, FiX } from "react-icons/fi";
import { db } from "../../services/firebase";
import { object } from "prop-types";
import MatchedModal from "../MatchedModal";
import { useDispatch } from "react-redux";
import {
  deleteMovie,
  likeMovie,
  toggleMatchModal,
  setCurrentMatch,
} from "../../store/actions";

const moment = require("moment");

function renderStars(rating) {
  let count = Math.floor(rating);
  console.log("This movie has this many stars", count);
  let stars = [];
  for (let i; i < count; i++) {
    stars.push(1);
  }
  stars.map((star) => {
    return <FiStar size={18} />;
  });
}

const Deck = (props) => {
  const dispatch = useDispatch();
  const USER = props.user;
  const MOVIES = props.data;
  const imgBaseURL = "https://image.tmdb.org/t/p/original";

  const [matchedMovie, setMatchedMovie] = React.useState(null);
  const [match, setMatch] = React.useState(false);
  const [toggleModal, setToggleModal] = React.useState(false);

  function addMovie(name, id, url) {
    db.ref(`matches/${id}`).child("users").push(USER.uid);
    db.ref(`matches/${id}`).update({ title: name, id: id, posterURL: url });

    updateMatches(id, USER.uid, name);

    dispatch(likeMovie(id));
  }

  // This function will listen when movie is liked in the match pool
  function updateMatches(movieID, user, movieTitle) {
    db.ref(`matches/${movieID}/users`).on("value", (snapshot) => {
      console.log(`Movie: ${movieID} was liked by ${user}`);
      // do stuff when a new user likes a movie;
      const data = Object.values(snapshot.val());
      console.log("Data is now:", data);

      // Check if there is at least 2 people and the person included is the
      // User
      if (data.length > 1 && data.includes(user)) {
        // do stuff when users match
        // console.log("USERS HAVE MATCHED!");
        db.ref(`matches/${movieID}`).update({
          users: data,
        });
        db.ref(`matches/${movieID}/chat`).update({ created: Date.now() });
        dispatch(setCurrentMatch({ movieID, movieTitle }));
        setMatchedMovie({ movieID, movieTitle });

        console.log("TOGGLE MATCH MODE");

        dispatch(toggleMatchModal(true));
        // setMatch(true);
        // setToggleModal(true);
      }
    });
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
          <MovieCard index={index} key={movie.id}>
            <Header>
              <Poster>
                <Img src={imgBaseURL + movie.poster_path} alt={movie.id} />
              </Poster>
              <Description>
                <Title>
                  {movie.title},{" "}
                  <span>{moment(movie.release_date).format("YYYY")}</span>
                </Title>
                <Rating>
                  {Array(Math.floor(movie.vote_average / 2)).fill(
                    <StyledStar size={32} />
                  )}
                </Rating>
                <Text>{movie.overview}</Text>
              </Description>
            </Header>
            <Action>
              <Button
                onClick={(ev) => {
                  addMovie(
                    movie.title,
                    movie.id,
                    imgBaseURL + movie.poster_path
                  );
                }}
              >
                <FiCheck size={32} color="green" />
              </Button>
              {/* <Button>
                <FiStar size={32} color="dodgerblue" />
              </Button> */}
              <Button onClick={() => dispatch(deleteMovie(movie.id))}>
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
  flex-flow: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 20px; */
  /* flex-flow: column; */
  /* overflow: hidden; */
`;

const MovieCard = styled.div`
  display: ${(props) => (props.index === 0 ? "flex" : "none")};
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: auto;
  background-color: ${THEMES.Primary};
  /* height: 400px; */
  border: 1px solid ${THEMES.BlackCoffee};

  /* margin: 20px 0; */
  border-radius: 22px;
  padding: 18px;

  /* margin-bottom: -20px; */
`;

const Action = styled.div`
  flex: 5;
  /* border: 3px dashed blue; */
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
`;

const Header = styled.div`
  flex: 6;
  display: flex;
  /* border: 5px solid goldenrod; */
  justify-content: space-between;
`;

const Poster = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  /* border: 5px dashed purple; */
`;

const Description = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  /* border: 2px solid red; */
  padding: 12px;
`;

const Img = styled.img`
  /* max-width: 280px;
  max-height: 400px; */
  width: 80%;

  border-radius: 22px;
  border: none;
`;

const Title = styled.h1`
  font-size: 1.9rem;
  font-weight: 500;
  margin: 5px 0;
  text-align: center;
  color: ${THEMES.BlackCoffee};
  & span {
    color: ${THEMES.White};
    margin-left: 8px;
    /* font-family: "Raleway"; */
    font-style: italic;
    font-weight: 400;
  }
`;

const Rating = styled.p`
  width: 100%;
  margin: 12px 0;
  /* border: 5px solid red; */
  text-align: center;
  font-size: 1.3rem;
  color: ${THEMES.White};
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    margin-left: 5px;
    font-style: italic;
    color: ${THEMES.White};
    font-weight: 500;
  }
`;

const StyledStar = styled(FiStar)`
  margin: 0 3px;
`;

const Text = styled.p`
  display: flex;
  font-size: 1.3rem;
  color: ${THEMES.BlackCoffee};
  justify-content: center;
  background-color: transparent;
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

export default Deck;
