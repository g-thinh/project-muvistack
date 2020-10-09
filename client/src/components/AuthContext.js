import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [appUser, setAppUser] = React.useState({});

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
        setAuthenticated(true);
        setAppUser(auth().currentUser);
      } else {
        setLoading(false);
        setAuthenticated(false);
        setAppUser({});
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ appUser, authenticated, setAuthenticated, setLoading, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
