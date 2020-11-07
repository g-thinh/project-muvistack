const fetch = require("isomorphic-fetch");

// This endpoint will fetch info about a single movie;

module.exports = async (req, res) => {
  const id = req.params.id;
  console.log("the incoming request for a single movie with id", id);

  const baseURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.KEY}`;

  const fetchData = async () => {
    let data;
    const params = "&language=en-US&include_adult=false&include_video=false";
    await fetch(baseURL + params)
      .then((res) => res.json())
      .then((json) => (data = json));
    // .then(() => console.log(data));
    return data;
  };
  const data = await fetchData();

  console.log("Returning data for the movie", data.original_title);

  try {
    return res.status(200).json({
      success: true,
      message: "Retrieved Single Movie!",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
