// ################## TOGGLERS ###########################

export const toggleSwipeMode = () => ({
  type: "TOGGLE_SWIPE_MODE",
});

// ############### SET PREFERENCES #####################

export const setMovieGenre = (genre) => ({
  type: "SET_MOVIE_GENRE",
  genre,
});

export const setCurrentMatch = (match) => ({
  type: "SET_CURRENT_MATCH",
  match,
});

// ################## GET CATEGORIES ###############

export const requestGenres = () => ({
  type: "REQUEST_GENRES",
});

export const receiveGenres = (genres) => ({
  type: "RECEIVE_GENRES",
  genres,
});

export const requestGenresError = () => ({
  type: "REQUEST_GENRES_ERROR",
});

// ################## GET USER MOVIES ###############

export const requestUserMovies = () => ({
  type: "REQUEST_USER_MOVIES",
});

export const receiveUserMovies = (likes) => ({
  type: "RECEIVE_USER_MOVIES",
  likes,
});

export const requestUserMoviesError = () => ({
  type: "REQUEST_USER_MOVIES_ERROR",
});

// ################## GET MOVIE LISTING ###############

export const requestMovies = () => ({
  type: "REQUEST_MOVIES",
});

export const receiveMovies = (movies) => ({
  type: "RECEIVE_MOVIES",
  movies,
});

export const requestMoviesError = () => ({
  type: "REQUEST_MOVIES_ERROR",
});

// ############## DELETE/ADD MOVIE LIST ##################

export const deleteMovie = (id) => ({
  type: "DELETE_MOVIE",
  id,
});

export const likeMovie = (id) => ({
  type: "LIKE_MOVIE",
  id,
});
