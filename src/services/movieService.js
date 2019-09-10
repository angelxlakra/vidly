import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";
export function getMovies() {
  return http.get(apiEndPoint);
}

export function deleteMovie(movieId) {
  http.delete(apiEndPoint + "/" + movieId);
}

export function saveMovie(movie) {
  http.update(apiEndPoint + "/" + movie._id);
  //   let movieInDb = movies.find(m => m._id === movie._id) || {};
  //   movieInDb.title = movie.title;
  //   movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  //   movieInDb.numberInStock = movie.numberInStock;
  //   movieInDb.dailyRentalRate = movie.dailyRentalRate;
  //   if (!movieInDb._id) {
  //     movieInDb._id = Date.now().toString();
  //     movies.push(movieInDb);
  //   }
  //   return movieInDb;
}

export function getMovie(movieId) {
  return http.get(apiEndPoint + "/" + movieId);
}
