const routes = require("express").Router();
const genres = require("./genre");
const movies = require("./movies");

routes.get("/", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Connected!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

routes.use("/genre", genres);
routes.use("/movies", movies);

module.exports = routes;
