import produce from "immer";

const initialState = {
  navToggle: false,
  matchToggle: false,
  dateToggle: false,
  status: "idle",
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_MENU": {
      return produce(state, (draftState) => {
        draftState.navToggle = !draftState.navToggle;
      });
    }

    case "TOGGLE_MATCHED_MODAL": {
      return produce(state, (draftState) => {
        draftState.matchToggle = action.bool;
      });
    }

    case "TOGGLE_DATE_MODAL": {
      return produce(state, (draftState) => {
        draftState.dateToggle = action.bool;
      });
    }

    default: {
      return state;
    }
  }
}
