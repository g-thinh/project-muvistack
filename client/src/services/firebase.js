import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");
require("dotenv").config();

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECTID,
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
