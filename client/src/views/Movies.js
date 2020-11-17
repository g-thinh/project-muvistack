import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { db } from "../services/firebase";
import { AuthContext } from "../components/AuthContext";
import { THEMES } from "../components/THEMES";
import Categories from "../components/Categories";
import Deck from "../components/Deck";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSwipeMode,
  requestMovies,
  receiveMovies,
  requestMoviesError,
  requestUserMovies,
  receiveUserMovies,
  requestUserMoviesError,
} from "../store/actions";

const Movies = () => {
  const dispatch = useDispatch();
  const TOGGLE_SWIPE = useSelector((state) => state.MOVIE.swipeMode);
  const SELECTED_MOVIES = useSelector((state) => state.MOVIE.currentMovies);
  const LIKED_MOVIES = useSelector((state) => state.MOVIE.currentLikes);
  const { appUser } = React.useContext(AuthContext);

  function handleClick(id, name) {
    const data = [];
    data.push(id);
    fetchMovies(data);
  }

  function fetchMovies(genres) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genres: genres,
      }),
    };
    dispatch(requestMovies());
    try {
      fetch("/movies", options)
        .then((res) => res.json())
        .then((json) => {
          // Checks if the user liked those movies before
          const RESULTS = json.data.results;
          const FILTERED_RESULTS = RESULTS.filter(
            (result) => !LIKED_MOVIES.includes(result.id)
          );
          dispatch(receiveMovies(FILTERED_RESULTS));
          dispatch(toggleSwipeMode());
        });
    } catch (error) {
      dispatch(requestMoviesError());
    }
  }

  function fetchUserLikedMovies() {
    dispatch(requestUserMovies());
    try {
      db.ref("matches").on("value", (snapshot) => {
        let likedMovies = [];
        snapshot.forEach((snap) => {
          let users = Object.values(snap.val().users);
          if (users.includes(appUser.uid)) {
            let key = snap.key;
            likedMovies.push(parseInt(key));
          }
        });
        dispatch(receiveUserMovies(likedMovies));
      });
    } catch (error) {
      dispatch(requestUserMoviesError());
    }
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserLikedMovies();
  }, []);

  // if (!LIKED_MOVIES) {
  //   return <Spinner />;
  // }

  return TOGGLE_SWIPE ? (
    <PageContainer>
      <PageTitle>Please Select a Movie Category</PageTitle>
      <Categories setTest={handleClick} />
    </PageContainer>
  ) : (
    <PageContainer>
      <Header>
        <Button
          onClick={(ev) => {
            // setSwipeMode(true);
            dispatch(toggleSwipeMode());
          }}
        >
          <FiArrowLeft size={32} />
        </Button>
        <p>Return to Genres</p>
      </Header>
      <Deck
        data={SELECTED_MOVIES}
        user={appUser}
        // deleteMovie={handleDeleteMovie}
      />
    </PageContainer>
  );
};

const PageTitle = styled.h1`
  font-size: 28px;
  margin: 2rem 0;
`;

const Header = styled.div`
  display: flex;
  align-self: flex-start;
  margin: 20px;
  align-items: center;
  /* border: 5px solid goldenrod; */

  & p {
    margin-left: 6px;
    font-size: 22px;
    font-weight: 500;
    user-select: none;
  }
`;

const Button = styled.button`
  display: flex;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  background-color: ${THEMES.BlackCoffee};
  /* align-self: flex-start; */

  &:hover {
    background: ${THEMES.Primary};
    transform: scale(1.1);
  }
`;

export default Movies;
