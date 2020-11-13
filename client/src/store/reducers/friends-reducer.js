import produce from "immer";

const initialState = {
  status: "idle",
  friends: null,
};

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_FRIENDS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_FRIENDS": {
      console.log("[RECEIVE FRIENDS]", action.friends);

      const results = produce(state, (draftState) => {
        draftState.friends = action.friends;
        draftState.status = "idle";
      });

      console.log("[RECEIVE FRIENDS RESULT]", results);

      return results;
    }

    case "REQUEST_FRIENDS_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    default: {
      return state;
    }
  }
}
