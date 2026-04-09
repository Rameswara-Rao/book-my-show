const movieRouter = require("express").Router();
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
} = require("../controllers/movieController");

// Add a Movie
movieRouter.post("/add-movie", addMovie);

// Get all movies
movieRouter.get("/get-all-movies", getAllMovies);

// Update a movie
movieRouter.put("/update-movie", updateMovie);

// Delete a movie
movieRouter.put("/delete-movie", deleteMovie);

// Get a movie by id
movieRouter.get("/movie/:id", getMovieById);

module.exports = movieRouter;
