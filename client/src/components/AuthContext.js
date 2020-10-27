import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import Spinner from "../components/UI/Spinner";

export const AuthContext = createContext(null);

const AuthProvider = ({ children, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [appUser, setAppUser] = React.useState({});
  const [hasProfile, setHasProfile] = React.useState(null);
  const [appUserKey, setAppUserKey] = React.useState("");

  React.useEffect(() => {
    console.log("[AuthContext.js] is mounted...");
    const unlisten = auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("[AuthContext.js] logged in user", user);

        db.ref("users")
          .child(user.uid)
          .on("value", (snapshot) => {
            const data = snapshot.val();
            setHasProfile(data.profileSetup);
            console.log("[AuthContext.js] user data:", data);
          });

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
    // return <h1>loading</h1>;
    return <Spinner />;
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
