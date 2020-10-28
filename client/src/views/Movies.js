import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { db } from "../services/firebase";
import Spinner from "../components/UI/Spinner";
import { AuthContext } from "../components/AuthContext";
import { THEMES } from "../components/THEMES";
import Categories from "../components/Categories";

const Movies = () => {
  const { appUser, loading } = React.useContext(AuthContext);
  const [test, setTest] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [pref, setPref] = React.useState(null);
  const [getGenres, setGetGenres] = React.useState(false);
  const [genres, setGenres] = React.useState(null);

  const fetchMovies = () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genres: [12, 16],
      }),
    };

    fetch("/movies", options);
  };

  const fetchGenres = () => {
    console.log("Fetching all Genres");
    fetch("/genre")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data[0].genres);
        setGenres(json.data[0].genres);
      });
    setGetGenres(true);
  };

  React.useEffect(() => {
    console.log("[Movies.js] is mounted...");
    // console.log("Users movie genre preference is:", pref);
    fetchGenres();
    db.ref("users")
      .child(appUser.uid)
      .once("value", (snapshot) => {
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
        <h1>This is where you setup the page</h1>
        <h1>{userName}</h1>
        <button
          onClick={(ev) => {
            setTest(false);
            setPref([12, 16]);
          }}
        >
          Submit Settings
        </button>
        <Categories data={genres} />
        {/* {genres &&
          genres.map((genre) => {
            return <h1>{genre.name}</h1>;
          })} */}
      </PageContainer>
    )
  ) : (
    <PageContainer>
      <h1>Hello There, this is where you swipe for movies</h1>
      <h1>{userName}</h1>
      <button onClick={(ev) => fetchMovies()}>Send Request</button>
    </PageContainer>
  );
};

export default Movies;
