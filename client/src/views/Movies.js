import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { db } from "../services/firebase";
import Spinner from "../components/UI/Spinner";
import { AuthContext } from "../components/AuthContext";
import { THEMES } from "../components/THEMES";
import Categories from "../components/Categories";
import Deck from "../components/Deck";
import { FiArrowLeft } from "react-icons/fi";

const Movies = () => {
  const { appUser, loading } = React.useContext(AuthContext);
  const [swipeMode, setSwipeMode] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [pref, setPref] = React.useState(null);
  const [getGenres, setGetGenres] = React.useState(false);
  const [genres, setGenres] = React.useState(null);
  const [movies, setMovies] = React.useState(null);
  const [likedMovies, setLikedMovies] = React.useState(null);

  function handleClick(id, name) {
    // console.log("The Genre Selected is:", name);
    const data = [];
    data.push(id);
    setPref(data);
    fetchMovies(data);
  }

  function handleDeleteMovie(id) {
    const results = movies.filter((movie) => movie.id !== id);
    setMovies(results);
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

    fetch("/movies", options)
      .then((res) => res.json())
      .then((json) => {
        // console.log("Users chose:", pref);
        // Checks if the user liked movies in chosen category, and filters
        // out the ones that were already liked.
        if (likedMovies[genres]) {
          const chosenGenre = Object.values(likedMovies[genres]);
          // console.log("Users likes:", chosenGenre);
          const results = json.data.results.filter(
            (movie) => !chosenGenre.includes(movie.id)
          );
          setMovies(results);
          setSwipeMode(false);
        } else {
          setMovies(json.data.results);
          setSwipeMode(false);
        }
      });
  }

  function fetchGenres() {
    // console.log("Fetching all Genres");
    fetch("/genre")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json.data[0].genres);
      });
    setGetGenres(true);
  }

  React.useEffect(() => {
    // console.log("[Movies.js] is mounted...");
    // console.log("[Movies.js] auth user is:", appUser.uid);
    fetchGenres();
    db.ref("users")
      .child(appUser.uid)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        // console.log("[Movies.js] fetched data", data);
        setUserName(data.email);
        setLikedMovies(data.LikedMovies);
        // setLoading(false);
      });
  }, [pref]);

  if (loading) {
    return <Spinner />;
  }

  return swipeMode ? (
    genres && (
      <PageContainer>
        <PageTitle>Please Select a Movie Category</PageTitle>
        {/* <h1>{userName}</h1> */}
        <Categories data={genres} setTest={handleClick} />
      </PageContainer>
    )
  ) : (
    <PageContainer>
      {/* <h1>Hello There, this is where you swipe for movies</h1> */}
      <Header>
        <Button
          onClick={(ev) => {
            setSwipeMode(true);
          }}
        >
          <FiArrowLeft size={32} />
        </Button>
        <p>Return to Genres</p>
      </Header>

      {movies && (
        <>
          <Deck
            data={movies}
            user={appUser}
            category={pref}
            deleteMovie={handleDeleteMovie}
          />
        </>
      )}
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
