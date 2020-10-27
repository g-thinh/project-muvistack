const fetch = require("isomorphic-fetch");

module.exports = async (req, res) => {
  //https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.KEY}

  const baseURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.KEY}`;
  const data = [];
  await fetch(baseURL)
    .then((res) => res.json())
    .then((json) => data.push(json));

  try {
    return res.status(200).json({
      success: true,
      message: "Retrieved All Genres!",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
