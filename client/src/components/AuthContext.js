import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [hasProfile, setHasProfile] = React.useState(undefined);
  const [appUser, setAppUser] = React.useState({});
  const [appUserKey, setAppUserKey] = React.useState("");

  React.useEffect(() => {
    console.log("[AuthContext.js] is mounted...");
    auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log("logged in user", user);
        setLoading(false);
        setAuthenticated(true);
        setAppUser(auth().currentUser);

        db.ref(`users`)
          .orderByChild("userID")
          .equalTo(user.uid)
          .on("value", (snapshot) => {
            const key = Object.keys(snapshot.val())[0];
            // console.log("The user's endpoint key is", key);
            setAppUserKey(key);

            // console.log(snapshot.val());
            snapshot.forEach((snap) => {
              const val = snap.val();
              setHasProfile(val.profileSetup);
            });
          });
        // console.log("These are all the users", userDB);
        // // console.log("the newly created user has the ID", userId);
      } else {
        setLoading(false);
        setAuthenticated(false);
        setAppUser({});
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        appUser,
        appUserKey,
        authenticated,
        setAuthenticated,
        setLoading,
        loading,
        hasProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
