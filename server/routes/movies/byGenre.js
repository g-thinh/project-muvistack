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

  // console.log("the url for the api is", baseURL + params);
  // console.log("the formatted genres query is now", formattedGenres);

  const fetchData = async (page) => {
    console.log("Fetching Page:", page);
    let data;
    const params = `&language=en-US&include_adult=false&include_video=false&page=${page}&with_genres=${formattedGenres}`;
    await fetch(baseURL + params)
      .then((res) => res.json())
      .then((json) => (data = json));
    // .then(() => console.log(data));
    return data;
  };

  const fetchPages = async () => {
    let data;
    const params = `&language=en-US&include_adult=false&include_video=false&with_genres=${formattedGenres}`;
    await fetch(baseURL + params)
      .then((res) => res.json())
      .then((json) => (data = json.total_pages));
    // .then(() => console.log(data));
    return data;
  };

  const TotalPages = await fetchPages();

  console.log("Total Pages", TotalPages);

  // Now Randomize the page
  function getRandomPage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomPage = getRandomPage(0, TotalPages);

  console.log("Random page is", randomPage);

  // const data = await fetchData(randomPage);
  const data = await fetchData(1);

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
