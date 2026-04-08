const movieRouter = require("express").Router();
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

// Add a Movie
movieRouter.post("/add-movie", addMovie);

// Get all movies
movieRouter.get("/get-all-movies", getAllMovies);

// Update a movie
movieRouter.put("/update-movie", updateMovie);

// Delete a movie
movieRouter.put("/delete-movie", deleteMovie);

module.exports = movieRouter;
