import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [hasProfile, setHasProfile] = React.useState();
  const [appUser, setAppUser] = React.useState({});



  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log("user", user.uid);
        // let checkProfile = [];
        setLoading(false);
        setAuthenticated(true);
        setAppUser(auth().currentUser);
        // db.ref(`users`).on("value", snapshot => {

        //   // snapshot.forEach((snap) => {
        //   //   userDB.push(snap.val());
        //   // });
        //   // console.log(TEST);          
        // });

        db.ref(`users`)
          .orderByChild('userID')
          .equalTo(user.uid)
          .on("value", snapshot => {
            // console.log(snapshot.val());
            snapshot.forEach(snap => {
              // currentUser = (snap.val().profileSetup);
              setHasProfile(snap.val().profileSetup);
            })
            // setHasProfile(currentUser);
            console.log("does the user have a profile setup?", hasProfile);
          })
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
      value={{ appUser, authenticated, setAuthenticated, setLoading, loading, hasProfile}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
