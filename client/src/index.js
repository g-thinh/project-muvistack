import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./components/AuthContext";
import AvatarProvider from "./components/AvatarContext";

ReactDOM.render(
  <AvatarProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AvatarProvider>,
  document.getElementById("root")
);
