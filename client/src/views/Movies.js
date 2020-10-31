import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { db } from "../services/firebase";
import Spinner from "../components/UI/Spinner";
import { AuthContext } from "../components/AuthContext";
import { THEMES } from "../components/THEMES";
import Categories from "../components/Categories";
import Deck from "../components/Deck";

const Movies = () => {
  const { appUser, loading } = React.useContext(AuthContext);
  const [test, setTest] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [pref, setPref] = React.useState(null);
  const [getGenres, setGetGenres] = React.useState(false);
  const [genres, setGenres] = React.useState(null);
  const [movies, setMovies] = React.useState(null);

  function handleClick(id, name) {
    console.log("The Genre Selected is:", name);
    const data = [];
    data.push(id);
    setPref(data);
    fetchMovies(data, null);
  }

  function handleDeleteMovie(id) {
    const currentMovies = movies;
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
        setMovies(json.data.results);
        setTest(false);
      });
  }

  function fetchGenres() {
    console.log("Fetching all Genres");
    fetch("/genre")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json.data[0].genres);
      });
    setGetGenres(true);
  }

  React.useEffect(() => {
    console.log("[Movies.js] is mounted...");
    console.log("[Movies.js] auth user is:", appUser.uid);
    fetchGenres();
    db.ref("users")
      .child(appUser.uid)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        // console.log("[Movies.js] fetched data", data);
        setUserName(data.email);
        // setLoading(false);
      });
  }, [pref]);

  if (loading) {
    return <Spinner />;
  }

  return test ? (
    genres && (
      <PageContainer>
        <PageTitle>Please Select a Movie Category</PageTitle>
        <h1>{userName}</h1>
        <Categories data={genres} setTest={handleClick} />
      </PageContainer>
    )
  ) : (
    <PageContainer>
      <h1>Hello There, this is where you swipe for movies</h1>
      <button
        onClick={(ev) => {
          setTest(true);
        }}
      >
        Return
      </button>
      {movies && (
        <Deck
          data={movies}
          user={appUser.uid}
          category={pref}
          deleteMovie={handleDeleteMovie}
        />
      )}
    </PageContainer>
  );
};

const PageTitle = styled.h1`
  font-size: 28px;
  margin: 2rem 0;
`;

export default Movies;
