import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./components/AuthContext";
import AvatarProvider from "./components/AvatarContext";
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>,

  document.getElementById("root")
);
