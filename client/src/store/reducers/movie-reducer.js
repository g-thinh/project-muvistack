import produce from "immer";

const initialState = {
  currentMovies: null,
  currentMatch: null,
  genres: [],
  currentLikes: null,
  swipeMode: true,
  matchModal: false,
  status: "idle",
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_SWIPE_MODE": {
      return produce(state, (draftState) => {
        draftState.swipeMode = !draftState.swipeMode;
      });
    }

    case "SET_CURRENT_MATCH": {
      console.log("CURRENT MATCH IS:", action);
      return produce(state, (draftState) => {
        draftState.currentMatch = action.match;
      });
    }

    // ####################### GET GENRES ######################

    case "REQUEST_GENRES": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_GENRES": {
      // console.log("[RECEIVE GENRES]", action.genres);
      const results = produce(state, (draftState) => {
        draftState.genres = action.genres;
        draftState.status = "idle";
      });
      // console.log("[RECEIVE GENRES RESULT]", results);
      return results;
    }

    case "REQUEST_GENRES_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    // ################### GET USER's MOVIES #################

    case "REQUEST_USER_MOVIES": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_USER_MOVIES": {
      // console.log("[RECEIVE USER MOVIES]", action.likes);
      const results = produce(state, (draftState) => {
        draftState.currentLikes = action.likes;
        draftState.status = "idle";
      });
      // console.log("[RECEIVE USER MOVIES RESULT]", results);
      return results;
    }

    case "REQUEST_USER_MOVIES_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    // ################### GET MOVIES #################

    case "REQUEST_MOVIES": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_MOVIES": {
      // console.log("[RECEIVE MOVIES]", action.movies);
      const results = produce(state, (draftState) => {
        draftState.currentMovies = action.movies;
        draftState.stats = "idle";
      });
      // console.log("[RECEIVE MOVIES RESULT]", results);
      return results;
    }

    case "REQUEST_MOVIES_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    case "DELETE_MOVIE": {
      // console.log("[DELETE MOVIES]", action.id);
      const newArray = state.currentMovies.filter(
        (movie) => movie.id !== action.id
      );
      // console.log("[NEW MOVIES]", newArray);
      const results = produce(state, (draftState) => {
        draftState.currentMovies = newArray;
      });
      // console.log("[DELETE MOVIES RESULT]", results);
      return results;
    }

    case "LIKE_MOVIE": {
      const newArray = state.currentMovies.filter(
        (movie) => movie.id !== action.id
      );
      const results = produce(state, (draftState) => {
        draftState.currentMovies = newArray;
      });
      return results;
    }
    default: {
      return state;
    }
  }
}
