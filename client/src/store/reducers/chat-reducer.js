import produce from "immer";

const initialState = {
  currentConvos: [],
  status: "idle",
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    // ####################### GET CONVOS ######################

    case "REQUEST_CONVOS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_CONVOS": {
      console.log("[RECEIVE CONVOS]", action.convos);
      let data;
      let newData;
      if (action.convos) {
        data = action.convos;
        newData = Object.keys(data).map((key) => {
          return data[key];
        });
      }

      const results = produce(state, (draftState) => {
        if (draftState.currentConvos.length === 0) {
          draftState.currentConvos = [];
        }
        draftState.currentConvos = newData;
        draftState.status = "idle";
      });
      console.log("[RECEIVE CONVOS RESULT]", results);
      return results;
    }

    case "RECEIVED_ALL_CONVOS": {
      return {
        ...state,
        status: "idle",
      };
    }

    case "REQUEST_CONVOS_ERROR": {
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
