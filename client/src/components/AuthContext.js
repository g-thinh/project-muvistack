import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [appUser, setAppUser] = React.useState({});
  const [appUserKey, setAppUserKey] = React.useState("");

  React.useEffect(() => {
    console.log("[AuthContext.js] is mounted...");
    const unlisten = auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("[AuthContext.js] logged in user", user);

        setAuthenticated(true);
        setAppUser(user);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setAppUser({});
        setLoading(false);
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  if (loading) {
    return <h1>Loading..</h1>;
  }

  return (
    <AuthContext.Provider
      value={{
        appUser,
        appUserKey,
        authenticated,
        setAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
