import produce from "immer";

const initialState = {
  profile: {},
  status: "idle",
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_CURRENT_USER": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_CURRENT_USER": {
      // console.log("[RECEIVE USER ACTION]", action.user);

      const results = produce(state, (draftState) => {
        draftState.profile = action.user;
        draftState.status = "idle";
      });

      // console.log("[RECEIVE USER RESULT]", results);

      return results;
    }

    case "REQUEST_CURRENT_USER_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    // ################# CURRENT USER SIGN OUT ####################

    case "REQUEST_CURRENT_USER_SIGNOUT": {
      const results = produce(state, (draftState) => {
        draftState.profile = {};
        draftState.status = "idle";
      });

      return results;
    }
    default: {
      return state;
    }
  }
}
