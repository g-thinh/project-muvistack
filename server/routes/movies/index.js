const movies = require("express").Router();
const byGenre = require("./byGenre");
const admin = require("firebase-admin");
require("dotenv").config();

// const serviceAccount = require("path/to/serviceAccountKey.json");
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://muvistack.firebaseio.com",
});

movies.post("/", byGenre);

movies.get("/test", (req, res) => {
  const db = admin.database();

  db.ref("test").push({ test: "Hello World" });

  try {
    return res.status(200).json({
      success: true,
      message: "Test Line!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});
module.exports = movies;
