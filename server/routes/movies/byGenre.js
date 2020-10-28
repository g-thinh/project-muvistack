const fetch = require("isomorphic-fetch");

// This endpoint requires a body that contains an array of genre ids to be searched
// {
//   "genres": [12,16,17]
// }

module.exports = async (req, res) => {
  const body = req.body;
  const genres = req.body.genres;
  console.log("The incoming request has body", genres);

  const baseURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.KEY}`;

  // const genres = [12, 16];
  const formattedGenres = genres.join("%2C");

  const params = `&language=en-US&include_adult=false&include_video=false&page=10&with_genres=${formattedGenres}`;

  // console.log("the url for the api is", baseURL + params);
  // console.log("the formatted genres query is now", formattedGenres);

  const fetchData = async () => {
    let data;
    await fetch(baseURL + params)
      .then((res) => res.json())
      .then((json) => (data = json));
    // .then(() => console.log(data));
    return data;
  };

  const data = await fetchData();

  console.log("Data received is", data.results.length);

  try {
    return res.status(200).json({
      success: true,
      message: "Retrieved Movies by Genres!",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
