import produce from "immer";

const initialState = {
  navToggle: false,
  status: "idle",
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_MENU": {
      return produce(state, (draftState) => {
        draftState.navToggle = !draftState.navToggle;
      });
    }
    default: {
      return state;
    }
  }
}
