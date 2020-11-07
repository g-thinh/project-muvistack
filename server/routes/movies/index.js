const movies = require("express").Router();
const byGenre = require("./byGenre");
const single = require("./single");
const { db } = require("../../firebase");

movies.post("/", byGenre);
movies.get("/:id", single);

movies.get("/test", (req, res) => {
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
