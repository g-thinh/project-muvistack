import React from "react";
import styled from "styled-components";

const Deck = (props) => {
  const data = props.data;
  const movies = data.results;
  const imgBaseURL = "https://image.tmdb.org/t/p/original";

  console.log(movies);
  return (
    <div>
      {movies.map((movie) => {
        return (
          <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}</p>
            <Poster src={imgBaseURL + movie.poster_path} alt={movie.id} />
          </div>
        );
      })}
    </div>
  );
};

const Poster = styled.img`
  width: 500px;
`;

export default Deck;
